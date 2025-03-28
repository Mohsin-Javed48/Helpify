const { Bid, Notification, ServiceRequest } = require("../models");

/**
 * Sets up bid event handlers for socket.io
 * @param {Object} socket - Socket.io socket instance
 * @param {Object} io - Socket.io server instance
 * @param {Object} userConnections - Map of user ID to socket connection
 */
const setupBidEventHandlers = (socket, io, userConnections) => {
  // Handle new service request from customer
  socket.on("service-request", async (data) => {
    try {
      console.log("New service request received:", data);

      // Validate request data
      if (!data.services || !data.scheduledDate || !data.address) {
        socket.emit("service-request-error", {
          message: "Invalid service request data",
          error: "VALIDATION_ERROR",
        });
        return;
      }

      // Save request to database
      const newRequest = await ServiceRequest.create({
        customerId: socket.userId,
        services: data.services,
        scheduledDate: data.scheduledDate,
        scheduledTime: data.scheduledTime,
        address: data.address,
        status: "pending",
        notes: data.notes || "",
      });

      // Notify relevant service providers
      // In production, filter by service type, location, availability, etc.
      // For now, broadcast to all service providers
      io.to("service_providers").emit("new-service-request", {
        requestId: newRequest.id,
        customerId: socket.userId,
        customerName: socket.user.username || "Customer",
        services: data.services,
        scheduledDate: data.scheduledDate,
        scheduledTime: data.scheduledTime,
        address: data.address,
        totalEstimate: data.services.reduce(
          (total, service) => total + service.price * service.quantity,
          0
        ),
      });

      // Create notifications for relevant service providers
      // In production, you'd query for eligible service providers
      // and create individual notifications

      // Confirm to customer
      socket.emit("service-request-confirmation", {
        message: "Your service request has been sent to service providers",
        requestId: newRequest.id,
      });
    } catch (error) {
      console.error("Error processing service request:", error);
      socket.emit("service-request-error", {
        message: "Error processing your request",
        error: "SERVER_ERROR",
      });
    }
  });

  // Handle bid from service provider
  socket.on("submit-bid", async (data) => {
    try {
      console.log("New bid received from service provider:", data);

      // Validate bid data
      if (!data.requestId || !data.bidAmount || data.bidAmount <= 0) {
        socket.emit("bid-error", {
          message: "Invalid bid data",
          error: "VALIDATION_ERROR",
        });
        return;
      }

      // Get the service request
      const serviceRequest = await ServiceRequest.findByPk(data.requestId);
      if (!serviceRequest) {
        socket.emit("bid-error", {
          message: "Service request not found",
          error: "NOT_FOUND",
        });
        return;
      }

      // Save bid to database
      const newBid = await Bid.create({
        serviceRequestId: data.requestId,
        serviceProviderId: socket.userId,
        customerId: serviceRequest.customerId,
        originalAmount: data.originalAmount,
        bidAmount: data.bidAmount,
        message: data.message || "",
        status: "pending",
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Expires in 7 days
      });

      // Notify the customer
      const customerSocket = userConnections[serviceRequest.customerId];
      if (customerSocket) {
        customerSocket.emit("new-bid-received", {
          bidId: newBid.id,
          requestId: data.requestId,
          serviceProviderId: socket.userId,
          serviceProviderName: socket.user.username || "Service Provider",
          originalAmount: data.originalAmount,
          bidAmount: data.bidAmount,
          message: data.message || "",
          createdAt: newBid.createdAt,
        });
      }

      // Create notification for customer
      await Notification.create({
        userId: serviceRequest.customerId,
        type: "NEW_BID",
        message: `You received a new bid of $${data.bidAmount} from ${
          socket.user.username || "a service provider"
        }`,
        data: {
          bidId: newBid.id,
          requestId: data.requestId,
        },
        isRead: false,
      });

      // Confirm to service provider
      socket.emit("bid-confirmation", {
        message: "Your bid has been submitted successfully",
        bidId: newBid.id,
      });
    } catch (error) {
      console.error("Error processing bid:", error);
      socket.emit("bid-error", {
        message: "Error processing your bid",
        error: "SERVER_ERROR",
      });
    }
  });

  // Handle counter offer from customer
  socket.on("submit-counter-offer", async (data) => {
    try {
      console.log("Counter offer received from customer:", data);

      // Validate counter offer data
      if (
        !data.bidId ||
        !data.counterOfferAmount ||
        data.counterOfferAmount <= 0
      ) {
        socket.emit("counter-offer-error", {
          message: "Invalid counter offer data",
          error: "VALIDATION_ERROR",
        });
        return;
      }

      // Get the bid
      const bid = await Bid.findByPk(data.bidId);
      if (!bid) {
        socket.emit("counter-offer-error", {
          message: "Bid not found",
          error: "NOT_FOUND",
        });
        return;
      }

      // Verify the customer owns this bid
      if (bid.customerId !== socket.userId) {
        socket.emit("counter-offer-error", {
          message: "Unauthorized to counter this bid",
          error: "UNAUTHORIZED",
        });
        return;
      }

      // Check if bid is in a valid state for counter offers
      if (bid.status !== "pending" && bid.status !== "countered") {
        socket.emit("counter-offer-error", {
          message: `Cannot counter a bid with status: ${bid.status}`,
          error: "INVALID_STATE",
        });
        return;
      }

      // Update bid status and counter offer
      await bid.update({
        counterOfferAmount: data.counterOfferAmount,
        counterOfferMessage: data.message || "",
        status: "countered",
        expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // Reset expiration to 3 days
      });

      // Notify the service provider
      io.to(`sp-${bid.serviceProviderId}`).emit("counter-offer-received", {
        bidId: bid.id,
        requestId: bid.serviceRequestId,
        customerId: socket.userId,
        customerName: socket.user.username || "Customer",
        originalAmount: bid.originalAmount,
        bidAmount: bid.bidAmount,
        counterOfferAmount: data.counterOfferAmount,
        message: data.message || "",
      });

      // Create notification for service provider
      await Notification.create({
        userId: bid.serviceProviderId,
        type: "COUNTER_OFFER",
        message: `${
          socket.user.username || "A customer"
        } countered your bid with $${data.counterOfferAmount}`,
        data: {
          bidId: bid.id,
          requestId: bid.serviceRequestId,
        },
        isRead: false,
      });

      // Confirm to customer
      socket.emit("counter-offer-confirmation", {
        message: "Your counter offer has been sent",
        bidId: bid.id,
      });
    } catch (error) {
      console.error("Error processing counter offer:", error);
      socket.emit("counter-offer-error", {
        message: "Error processing your counter offer",
        error: "SERVER_ERROR",
      });
    }
  });

  // Handle bid acceptance from customer
  socket.on("accept-bid", async (data) => {
    try {
      console.log("Bid acceptance received from customer:", data);

      // Validate acceptance data
      if (!data.bidId) {
        socket.emit("accept-bid-error", {
          message: "Invalid acceptance data",
          error: "VALIDATION_ERROR",
        });
        return;
      }

      // Get the bid
      const bid = await Bid.findByPk(data.bidId);
      if (!bid) {
        socket.emit("accept-bid-error", {
          message: "Bid not found",
          error: "NOT_FOUND",
        });
        return;
      }

      // Verify the customer owns this bid
      if (bid.customerId !== socket.userId) {
        socket.emit("accept-bid-error", {
          message: "Unauthorized to accept this bid",
          error: "UNAUTHORIZED",
        });
        return;
      }

      // Check if bid is in a valid state for acceptance
      if (bid.status !== "pending" && bid.status !== "countered") {
        socket.emit("accept-bid-error", {
          message: `Cannot accept a bid with status: ${bid.status}`,
          error: "INVALID_STATE",
        });
        return;
      }

      // Update bid status
      await bid.update({
        status: "accepted",
        acceptedAt: new Date(),
      });

      // Update the service request status
      const serviceRequest = await ServiceRequest.findByPk(
        bid.serviceRequestId
      );
      if (serviceRequest) {
        await serviceRequest.update({
          status: "accepted",
          serviceProviderId: bid.serviceProviderId,
          finalAmount: bid.counterOfferAmount || bid.bidAmount,
        });
      }

      // Reject all other bids for this request
      await Bid.update(
        { status: "rejected" },
        {
          where: {
            serviceRequestId: bid.serviceRequestId,
            id: { $ne: bid.id },
            status: { $in: ["pending", "countered"] },
          },
        }
      );

      // Notify the service provider
      io.to(`sp-${bid.serviceProviderId}`).emit("bid-accepted", {
        bidId: bid.id,
        requestId: bid.serviceRequestId,
        customerId: socket.userId,
        customerName: socket.user.username || "Customer",
        finalAmount: bid.counterOfferAmount || bid.bidAmount,
      });

      // Create notification for service provider
      await Notification.create({
        userId: bid.serviceProviderId,
        type: "BID_ACCEPTED",
        message: `${
          socket.user.username || "A customer"
        } accepted your bid for $${bid.counterOfferAmount || bid.bidAmount}`,
        data: {
          bidId: bid.id,
          requestId: bid.serviceRequestId,
        },
        isRead: false,
      });

      // Confirm to customer
      socket.emit("accept-bid-confirmation", {
        message: "Bid accepted successfully",
        bidId: bid.id,
      });
    } catch (error) {
      console.error("Error processing bid acceptance:", error);
      socket.emit("accept-bid-error", {
        message: "Error processing your bid acceptance",
        error: "SERVER_ERROR",
      });
    }
  });
};

module.exports = setupBidEventHandlers;
