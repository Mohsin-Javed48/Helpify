const {
  Bid,
  Notification,
  ServiceRequest,
  User,
  sequelize,
} = require("../models");
const { getConnections } = require("../services/socketService");
const { Op } = require("sequelize");

// Get all bids for a specific customer
exports.getCustomerBids = async (req, res) => {
  try {
    const customerId = req.params.customerId || req.user.id;

    const bids = await Bid.findAll({
      where: { customerId },
      include: [
        {
          model: User,
          as: "serviceProvider",
          attributes: [
            "id",
            "firstName",
            "lastName",
            "profilePicture",
            "rating",
          ],
        },
        {
          model: ServiceRequest,
          as: "serviceRequest",
          attributes: [
            "id",
            "services",
            "scheduledDate",
            "scheduledTime",
            "address",
            "status",
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      success: true,
      data: bids,
    });
  } catch (error) {
    console.error("Error fetching customer bids:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching bids",
      error: error.message,
    });
  }
};

// Get all bids for a specific service provider
exports.getServiceProviderBids = async (req, res) => {
  try {
    const serviceProviderId = req.params.serviceProviderId || req.user.id;

    const bids = await Bid.findAll({
      where: { serviceProviderId },
      include: [
        {
          model: User,
          as: "customer",
          attributes: ["id", "firstName", "lastName", "profilePicture"],
        },
        {
          model: ServiceRequest,
          as: "serviceRequest",
          attributes: [
            "id",
            "services",
            "scheduledDate",
            "scheduledTime",
            "address",
            "status",
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      success: true,
      data: bids,
    });
  } catch (error) {
    console.error("Error fetching service provider bids:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching bids",
      error: error.message,
    });
  }
};

// Get all bids for a specific service request
exports.getBidsByRequest = async (req, res) => {
  try {
    const { requestId } = req.params;

    // Verify the request exists
    const request = await ServiceRequest.findByPk(requestId);
    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Service request not found",
      });
    }

    // Verify the user is the customer who created the request
    if (
      request.customerId !== req.user.id &&
      !req.user.roles.includes("admin")
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to view these bids",
      });
    }

    const bids = await Bid.findAll({
      where: { serviceRequestId: requestId },
      include: [
        {
          model: User,
          as: "serviceProvider",
          attributes: [
            "id",
            "firstName",
            "lastName",
            "profilePicture",
            "rating",
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      success: true,
      data: bids,
    });
  } catch (error) {
    console.error("Error fetching request bids:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching bids",
      error: error.message,
    });
  }
};

// Create a new bid
exports.createBid = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { requestId, bidPrice, message } = req.body;
    const serviceProviderId = req.user.id;

    // Validate required fields
    if (!requestId || !bidPrice) {
      await transaction.rollback();
      return res.status(400).json({
        success: false,
        message: "Request ID and bid price are required",
      });
    }

    // Check that the bid price is greater than zero
    if (bidPrice <= 0) {
      await transaction.rollback();
      return res.status(400).json({
        success: false,
        message: "Bid price must be greater than zero",
      });
    }

    // Get the service request
    const serviceRequest = await ServiceRequest.findByPk(requestId, {
      transaction,
    });
    if (!serviceRequest) {
      await transaction.rollback();
      return res.status(404).json({
        success: false,
        message: "Service request not found",
      });
    }

    // Check that the service request is still pending
    if (serviceRequest.status !== "pending") {
      await transaction.rollback();
      return res.status(400).json({
        success: false,
        message: `Cannot bid on a request with status: ${serviceRequest.status}`,
      });
    }

    // Check if there's already a bid from this service provider
    const existingBid = await Bid.findOne({
      where: {
        serviceRequestId: requestId,
        serviceProviderId,
      },
      transaction,
    });

    if (existingBid) {
      await transaction.rollback();
      return res.status(400).json({
        success: false,
        message: "You have already placed a bid for this request",
      });
    }

    // Calculate original price from service request
    const originalPrice = serviceRequest.getTotalEstimatedPrice();

    // Create the bid
    const newBid = await Bid.create(
      {
        serviceRequestId: requestId,
        serviceProviderId,
        customerId: serviceRequest.customerId,
        originalPrice,
        bidPrice,
        message: message || "",
        status: "pending",
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      },
      { transaction }
    );

    // Fetch provider details for the response
    const serviceProvider = await User.findByPk(serviceProviderId, {
      attributes: ["id", "firstName", "lastName", "profilePicture", "rating"],
      transaction,
    });

    // Create a notification for the customer
    await Notification.create(
      {
        userId: serviceRequest.customerId,
        type: "NEW_BID",
        message: `You received a new bid of $${bidPrice} from ${serviceProvider.firstName} ${serviceProvider.lastName}`,
        data: {
          bidId: newBid.id,
          requestId,
        },
        isRead: false,
      },
      { transaction }
    );

    await transaction.commit();

    // Notify the customer via socket if they are online
    const connections = getConnections();
    const customerSocket = connections.users[serviceRequest.customerId];
    if (customerSocket) {
      customerSocket.emit("new-bid-received", {
        bidId: newBid.id,
        requestId,
        serviceProviderId,
        serviceProviderName: `${serviceProvider.firstName} ${serviceProvider.lastName}`,
        originalPrice,
        bidPrice,
        message: message || "",
        createdAt: newBid.createdAt,
      });
    }

    res.status(201).json({
      success: true,
      message: "Bid created successfully",
      data: newBid,
    });
  } catch (error) {
    await transaction.rollback();
    console.error("Error creating bid:", error);
    res.status(500).json({
      success: false,
      message: "Error creating bid",
      error: error.message,
    });
  }
};

// Update bid status (accept/reject)
exports.updateBidStatus = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { bidId } = req.params;
    const { status } = req.body;
    const userId = req.user.id;

    // Validate status
    if (!status || !["accepted", "rejected"].includes(status)) {
      await transaction.rollback();
      return res.status(400).json({
        success: false,
        message: "Valid status (accepted or rejected) is required",
      });
    }

    // Find the bid
    const bid = await Bid.findByPk(bidId, { transaction });
    if (!bid) {
      await transaction.rollback();
      return res.status(404).json({
        success: false,
        message: "Bid not found",
      });
    }

    // Verify the user is the customer who received the bid
    if (bid.customerId !== userId) {
      await transaction.rollback();
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this bid",
      });
    }

    // Check if bid is in a valid state to be updated
    if (bid.status !== "pending" && bid.status !== "counter_offered") {
      await transaction.rollback();
      return res.status(400).json({
        success: false,
        message: `Cannot update a bid with status: ${bid.status}`,
      });
    }

    // Update the bid
    bid.status = status;
    if (status === "accepted") {
      bid.acceptedAt = new Date();
    }
    await bid.save({ transaction });

    // If accepted, update the service request and reject other bids
    if (status === "accepted") {
      // Update service request
      const serviceRequest = await ServiceRequest.findByPk(
        bid.serviceRequestId,
        { transaction }
      );
      if (serviceRequest) {
        serviceRequest.status = "accepted";
        serviceRequest.serviceProviderId = bid.serviceProviderId;
        serviceRequest.finalAmount = bid.counterOfferAmount || bid.bidPrice;
        await serviceRequest.save({ transaction });
      }

      // Reject other pending bids for this request
      await Bid.update(
        { status: "rejected" },
        {
          where: {
            serviceRequestId: bid.serviceRequestId,
            id: { [Op.ne]: bidId },
            status: { [Op.in]: ["pending", "countered"] },
          },
          transaction,
        }
      );
    }

    // Create a notification for the service provider
    await Notification.create(
      {
        userId: bid.serviceProviderId,
        type: status === "accepted" ? "BID_ACCEPTED" : "BID_REJECTED",
        message:
          status === "accepted"
            ? `Your bid for $${
                bid.counterOfferAmount || bid.bidPrice
              } has been accepted!`
            : "Your bid has been rejected.",
        data: {
          bidId,
          requestId: bid.serviceRequestId,
        },
        isRead: false,
      },
      { transaction }
    );

    await transaction.commit();

    // Notify the service provider via socket
    const connections = getConnections();
    if (connections.serviceProviders[bid.serviceProviderId]) {
      connections.serviceProviders[bid.serviceProviderId].emit(
        status === "accepted" ? "bid-accepted" : "bid-rejected",
        {
          bidId,
          requestId: bid.serviceRequestId,
          customerId: userId,
        }
      );
    }

    res.status(200).json({
      success: true,
      message: `Bid ${status} successfully`,
      data: bid,
    });
  } catch (error) {
    await transaction.rollback();
    console.error("Error updating bid status:", error);
    res.status(500).json({
      success: false,
      message: "Error updating bid status",
      error: error.message,
    });
  }
};

// Submit a counter offer
exports.submitCounterOffer = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { bidId } = req.params;
    const { counterOfferPrice, message } = req.body;
    const userId = req.user.id;

    // Validate counter offer amount
    if (!counterOfferPrice || counterOfferPrice <= 0) {
      await transaction.rollback();
      return res.status(400).json({
        success: false,
        message: "Valid counter offer price is required",
      });
    }

    // Find the bid
    const bid = await Bid.findByPk(bidId, { transaction });
    if (!bid) {
      await transaction.rollback();
      return res.status(404).json({
        success: false,
        message: "Bid not found",
      });
    }

    // Verify the user is the customer who received the bid
    if (bid.customerId !== userId) {
      await transaction.rollback();
      return res.status(403).json({
        success: false,
        message: "You are not authorized to counter this bid",
      });
    }

    // Check if bid is in a valid state for counter offers
    if (bid.status !== "pending" && bid.status !== "counter_offered") {
      await transaction.rollback();
      return res.status(400).json({
        success: false,
        message: `Cannot counter a bid with status: ${bid.status}`,
      });
    }

    // Update the bid
    bid.counterOfferPrice = counterOfferPrice;
    bid.counterOfferMessage = message || "";
    bid.status = "counter_offered";
    bid.expiresAt = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000); // Reset expiration to 3 days
    await bid.save({ transaction });

    // Create a notification for the service provider
    await Notification.create(
      {
        userId: bid.serviceProviderId,
        type: "COUNTER_OFFER",
        message: `You received a counter offer of $${counterOfferPrice}`,
        data: {
          bidId,
          requestId: bid.serviceRequestId,
        },
        isRead: false,
      },
      { transaction }
    );

    await transaction.commit();

    // Notify the service provider via socket
    const connections = getConnections();
    if (connections.serviceProviders[bid.serviceProviderId]) {
      connections.serviceProviders[bid.serviceProviderId].emit(
        "counter-offer-received",
        {
          bidId,
          requestId: bid.serviceRequestId,
          customerId: userId,
          counterOfferPrice,
          message: message || "",
        }
      );
    }

    res.status(200).json({
      success: true,
      message: "Counter offer submitted successfully",
      data: bid,
    });
  } catch (error) {
    await transaction.rollback();
    console.error("Error submitting counter offer:", error);
    res.status(500).json({
      success: false,
      message: "Error submitting counter offer",
      error: error.message,
    });
  }
};

// Get a specific bid by ID
exports.getBidById = async (req, res) => {
  try {
    const { bidId } = req.params;
    const userId = req.user.id;

    const bid = await Bid.findByPk(bidId, {
      include: [
        {
          model: User,
          as: "serviceProvider",
          attributes: [
            "id",
            "firstName",
            "lastName",
            "profilePicture",
            "rating",
          ],
        },
        {
          model: User,
          as: "customer",
          attributes: ["id", "firstName", "lastName", "profilePicture"],
        },
        {
          model: ServiceRequest,
          as: "serviceRequest",
          attributes: [
            "id",
            "services",
            "scheduledDate",
            "scheduledTime",
            "address",
            "status",
          ],
        },
      ],
    });

    if (!bid) {
      return res.status(404).json({
        success: false,
        message: "Bid not found",
      });
    }

    // Check if user is authorized to view this bid
    if (
      bid.customerId !== userId &&
      bid.serviceProviderId !== userId &&
      !req.user.roles.includes("admin")
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to view this bid",
      });
    }

    res.status(200).json({
      success: true,
      data: bid,
    });
  } catch (error) {
    console.error("Error fetching bid:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching bid",
      error: error.message,
    });
  }
};
