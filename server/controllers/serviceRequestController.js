const {
  ServiceRequest,
  Bid,
  User,
  Notification,
  sequelize,
} = require("../models");
const { Op } = require("sequelize");
const { getConnections } = require("../services/socketService");

// Create a new service request
exports.createServiceRequest = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { services, scheduledDate, scheduledTime, address, notes } = req.body;
    const customerId = req.user.id;

    // Validate required fields
    if (!services || !scheduledDate || !scheduledTime || !address) {
      await transaction.rollback();
      return res.status(400).json({
        success: false,
        message: "Services, scheduled date, time, and address are required",
      });
    }

    // Create the service request
    const serviceRequest = await ServiceRequest.create(
      {
        customerId,
        services,
        scheduledDate,
        scheduledTime,
        address,
        notes: notes || "",
        status: "pending",
      },
      { transaction }
    );

    await transaction.commit();

    // Notify service providers via socket that a new request is available
    const connections = getConnections();
    if (connections.serviceProviders) {
      // Get all service provider IDs that are currently connected
      const serviceProviderIds = Object.keys(connections.serviceProviders);

      // Notify each connected service provider
      serviceProviderIds.forEach(async (providerId) => {
        // Check if the service provider offers any of the requested services
        // This is a simplified check - you would need to compare the provider's services
        // with the requested services for a more accurate filter
        connections.serviceProviders[providerId].emit("new-service-request", {
          requestId: serviceRequest.id,
          message: "A new service request is available for bidding",
        });

        // Create a notification for the service provider
        await Notification.create({
          userId: providerId,
          type: "SERVICE_REQUEST",
          message: "A new service request is available for bidding",
          data: {
            requestId: serviceRequest.id,
          },
          isRead: false,
        });
      });
    }

    res.status(201).json({
      success: true,
      message: "Service request created successfully",
      data: serviceRequest,
    });
  } catch (error) {
    await transaction.rollback();
    console.error("Error creating service request:", error);
    res.status(500).json({
      success: false,
      message: "Error creating service request",
      error: error.message,
    });
  }
};

// Get all service requests for a specific customer
exports.getCustomerServiceRequests = async (req, res) => {
  try {
    const customerId = req.params.customerId || req.user.id;

    // Check if user is authorized to view these requests
    if (customerId !== req.user.id && !req.user.roles.includes("admin")) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to view these requests",
      });
    }

    // Get service requests with bid count
    const serviceRequests = await ServiceRequest.findAll({
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
      ],
      order: [["createdAt", "DESC"]],
    });

    // Get bid counts for each request
    for (const request of serviceRequests) {
      const bidCount = await Bid.count({
        where: { serviceRequestId: request.id },
      });
      request.dataValues.bidCount = bidCount;
    }

    res.status(200).json({
      success: true,
      data: serviceRequests,
    });
  } catch (error) {
    console.error("Error fetching customer service requests:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching service requests",
      error: error.message,
    });
  }
};

// Get all service requests available for bidding by a service provider
exports.getServiceProviderRequests = async (req, res) => {
  try {
    const serviceProviderId = req.user.id;

    // Get pending service requests
    // Exclude requests that the provider has already bid on
    const existingBids = await Bid.findAll({
      where: { serviceProviderId },
      attributes: ["serviceRequestId"],
    });

    const alreadyBidRequestIds = existingBids.map(
      (bid) => bid.serviceRequestId
    );

    const serviceRequests = await ServiceRequest.findAll({
      where: {
        status: "pending",
        id: { [Op.notIn]: alreadyBidRequestIds },
      },
      include: [
        {
          model: User,
          as: "customer",
          attributes: ["id", "firstName", "lastName", "profilePicture"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      success: true,
      data: serviceRequests,
    });
  } catch (error) {
    console.error("Error fetching service provider requests:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching service requests",
      error: error.message,
    });
  }
};

// Get a specific service request by ID
exports.getServiceRequestById = async (req, res) => {
  try {
    const { requestId } = req.params;
    const userId = req.user.id;

    const serviceRequest = await ServiceRequest.findByPk(requestId, {
      include: [
        {
          model: User,
          as: "customer",
          attributes: ["id", "firstName", "lastName", "profilePicture"],
        },
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
    });

    if (!serviceRequest) {
      return res.status(404).json({
        success: false,
        message: "Service request not found",
      });
    }

    // Check if user is authorized to view this request
    if (
      serviceRequest.customerId !== userId &&
      serviceRequest.serviceProviderId !== userId &&
      !req.user.roles.includes("admin")
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to view this request",
      });
    }

    // Get bid count
    const bidCount = await Bid.count({
      where: { serviceRequestId: requestId },
    });
    serviceRequest.dataValues.bidCount = bidCount;

    res.status(200).json({
      success: true,
      data: serviceRequest,
    });
  } catch (error) {
    console.error("Error fetching service request:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching service request",
      error: error.message,
    });
  }
};

// Update service request status
exports.updateServiceRequestStatus = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { requestId } = req.params;
    const { status } = req.body;
    const userId = req.user.id;

    // Validate status
    if (!status || !["accepted", "completed", "cancelled"].includes(status)) {
      await transaction.rollback();
      return res.status(400).json({
        success: false,
        message: "Valid status (accepted, completed, or cancelled) is required",
      });
    }

    // Find the service request
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

    // Check if user is authorized to update this request
    const isCustomer = serviceRequest.customerId === userId;
    const isProvider = serviceRequest.serviceProviderId === userId;
    const isAdmin = req.user.roles.includes("admin");

    if (!isCustomer && !isProvider && !isAdmin) {
      await transaction.rollback();
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this request",
      });
    }

    // Additional validation based on the status and user role
    if (status === "accepted" && !isProvider && !isAdmin) {
      await transaction.rollback();
      return res.status(403).json({
        success: false,
        message: "Only service providers can accept requests",
      });
    }

    if (status === "completed" && !isProvider && !isAdmin) {
      await transaction.rollback();
      return res.status(403).json({
        success: false,
        message: "Only service providers can mark requests as completed",
      });
    }

    // Update the service request
    serviceRequest.status = status;
    await serviceRequest.save({ transaction });

    // Create notifications based on the status change
    let notificationType, notificationMessage;
    let recipientId;

    if (status === "accepted") {
      notificationType = "SERVICE_ACCEPTED";
      notificationMessage = "Your service request has been accepted";
      recipientId = serviceRequest.customerId;
    } else if (status === "completed") {
      notificationType = "SERVICE_COMPLETED";
      notificationMessage = "Your service has been marked as completed";
      recipientId = serviceRequest.customerId;
    } else if (status === "cancelled") {
      if (isCustomer) {
        notificationType = "SERVICE_CANCELLED";
        notificationMessage = "The customer has cancelled the service request";
        recipientId = serviceRequest.serviceProviderId;
      } else {
        notificationType = "SERVICE_CANCELLED";
        notificationMessage =
          "The service provider has cancelled the service request";
        recipientId = serviceRequest.customerId;
      }
    }

    if (recipientId) {
      await Notification.create(
        {
          userId: recipientId,
          type: notificationType,
          message: notificationMessage,
          data: {
            requestId,
          },
          isRead: false,
        },
        { transaction }
      );

      // Notify the recipient via socket
      const connections = getConnections();
      if (connections.users[recipientId]) {
        connections.users[recipientId].emit("service-request-updated", {
          requestId,
          status,
          message: notificationMessage,
        });
      }
    }

    await transaction.commit();

    res.status(200).json({
      success: true,
      message: `Service request status updated to ${status}`,
      data: serviceRequest,
    });
  } catch (error) {
    await transaction.rollback();
    console.error("Error updating service request status:", error);
    res.status(500).json({
      success: false,
      message: "Error updating service request status",
      error: error.message,
    });
  }
};
