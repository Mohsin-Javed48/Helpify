const {
  PriceNegotiation,
  Bid,
  ServiceRequest,
  User,
  Notification,
} = require("../models");
const { getConnections } = require("../services/socketService");
const { Op } = require("sequelize");

// Create a new price negotiation
exports.createNegotiation = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { bidId, proposedAmount, message } = req.body;
    const userId = req.user.id;
    const isCustomer = req.user.roleId === 1;

    // Get the bid details
    const bid = await Bid.findByPk(bidId, {
      include: [
        {
          model: ServiceRequest,
          as: "serviceRequest",
        },
      ],
    });

    if (!bid) {
      await transaction.rollback();
      return res.status(404).json({
        success: false,
        message: "Bid not found",
      });
    }

    // Validate that the user is either the customer or service provider
    if (bid.customerId !== userId && bid.serviceProviderId !== userId) {
      await transaction.rollback();
      return res.status(403).json({
        success: false,
        message: "You are not authorized to negotiate this bid",
      });
    }

    // Create the negotiation
    const negotiation = await PriceNegotiation.create(
      {
        serviceRequestId: bid.serviceRequestId,
        bidId,
        customerId: bid.customerId,
        serviceProviderId: bid.serviceProviderId,
        proposedAmount,
        message,
        isFromCustomer: isCustomer,
        status: "pending",
      },
      { transaction }
    );

    // Get user details for notification
    const user = await User.findByPk(userId, {
      attributes: ["id", "firstName", "lastName"],
    });

    // Create notification for the other party
    const recipientId = isCustomer ? bid.serviceProviderId : bid.customerId;
    await Notification.create(
      {
        userId: recipientId,
        type: "PRICE_NEGOTIATION",
        message: `${user.firstName} ${user.lastName} proposed a new price of $${proposedAmount}`,
        data: {
          negotiationId: negotiation.id,
          bidId,
          requestId: bid.serviceRequestId,
        },
        isRead: false,
      },
      { transaction }
    );

    await transaction.commit();

    // Notify the other party via socket
    const connections = getConnections();
    if (connections.users[recipientId]) {
      connections.users[recipientId].emit("new-price-negotiation", {
        negotiationId: negotiation.id,
        bidId,
        requestId: bid.serviceRequestId,
        proposedAmount,
        message,
        isFromCustomer,
        senderName: `${user.firstName} ${user.lastName}`,
      });
    }

    res.status(201).json({
      success: true,
      message: "Price negotiation created successfully",
      data: negotiation,
    });
  } catch (error) {
    await transaction.rollback();
    console.error("Error creating price negotiation:", error);
    res.status(500).json({
      success: false,
      message: "Error creating price negotiation",
      error: error.message,
    });
  }
};

// Get all negotiations for a bid
exports.getNegotiations = async (req, res) => {
  try {
    const { bidId } = req.params;
    const userId = req.user.id;

    // Get the bid details
    const bid = await Bid.findByPk(bidId);
    if (!bid) {
      return res.status(404).json({
        success: false,
        message: "Bid not found",
      });
    }

    // Validate that the user is either the customer or service provider
    if (bid.customerId !== userId && bid.serviceProviderId !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to view these negotiations",
      });
    }

    // Get all negotiations for this bid
    const negotiations = await PriceNegotiation.findAll({
      where: { bidId },
      include: [
        {
          model: User,
          as: "customer",
          attributes: ["id", "firstName", "lastName", "profilePicture"],
        },
        {
          model: User,
          as: "serviceProvider",
          attributes: ["id", "firstName", "lastName", "profilePicture"],
        },
      ],
      order: [["createdAt", "ASC"]],
    });

    res.status(200).json({
      success: true,
      data: negotiations,
    });
  } catch (error) {
    console.error("Error fetching negotiations:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching negotiations",
      error: error.message,
    });
  }
};

// Accept or reject a negotiation
exports.updateNegotiationStatus = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { negotiationId } = req.params;
    const { status } = req.body;
    const userId = req.user.id;

    // Validate status
    if (!["accepted", "rejected"].includes(status)) {
      await transaction.rollback();
      return res.status(400).json({
        success: false,
        message: "Invalid status. Must be either accepted or rejected",
      });
    }

    // Get the negotiation
    const negotiation = await PriceNegotiation.findByPk(negotiationId, {
      include: [
        {
          model: Bid,
          as: "bid",
        },
      ],
    });

    if (!negotiation) {
      await transaction.rollback();
      return res.status(404).json({
        success: false,
        message: "Negotiation not found",
      });
    }

    // Validate that the user is the other party
    const isCustomer = negotiation.customerId === userId;
    const isProvider = negotiation.serviceProviderId === userId;
    if (!isCustomer && !isProvider) {
      await transaction.rollback();
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this negotiation",
      });
    }

    // Update negotiation status
    negotiation.status = status;
    await negotiation.save({ transaction });

    // If accepted, update the bid price
    if (status === "accepted") {
      await negotiation.bid.update(
        {
          bidPrice: negotiation.proposedAmount,
        },
        { transaction }
      );
    }

    // Get user details for notification
    const user = await User.findByPk(userId, {
      attributes: ["id", "firstName", "lastName"],
    });

    // Create notification for the other party
    const recipientId = isCustomer
      ? negotiation.serviceProviderId
      : negotiation.customerId;
    await Notification.create(
      {
        userId: recipientId,
        type: "NEGOTIATION_UPDATE",
        message: `${user.firstName} ${user.lastName} ${status} your price proposal of $${negotiation.proposedAmount}`,
        data: {
          negotiationId: negotiation.id,
          bidId: negotiation.bidId,
          requestId: negotiation.serviceRequestId,
        },
        isRead: false,
      },
      { transaction }
    );

    await transaction.commit();

    // Notify the other party via socket
    const connections = getConnections();
    if (connections.users[recipientId]) {
      connections.users[recipientId].emit("negotiation-status-updated", {
        negotiationId: negotiation.id,
        bidId: negotiation.bidId,
        requestId: negotiation.serviceRequestId,
        status,
        proposedAmount: negotiation.proposedAmount,
        updatedBy: `${user.firstName} ${user.lastName}`,
      });
    }

    res.status(200).json({
      success: true,
      message: `Negotiation ${status} successfully`,
      data: negotiation,
    });
  } catch (error) {
    await transaction.rollback();
    console.error("Error updating negotiation status:", error);
    res.status(500).json({
      success: false,
      message: "Error updating negotiation status",
      error: error.message,
    });
  }
};
