"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Bid extends Model {
    static associate(models) {
      // Define associations
      Bid.belongsTo(models.User, { 
        foreignKey: "serviceProviderId", 
        as: "serviceProvider" 
      });
      Bid.belongsTo(models.User, { 
        foreignKey: "customerId", 
        as: "customer" 
      });
      Bid.belongsTo(models.Order, { 
        foreignKey: "orderId", 
        as: "order" 
      });
      Bid.belongsTo(models.ServiceRequest, { 
        foreignKey: "serviceRequestId", 
        as: "serviceRequest" 
      });
    }
  }

  Bid.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      serviceProviderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "ServiceProviders",
          key: "id",
        },
      },
      customerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      orderId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Orders",
          key: "id",
        },
      },
      serviceRequestId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "ServiceRequests",
          key: "id",
        },
      },
      originalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        comment: "Original price before bidding",
      },
      bidPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        comment: "Provider's bid price",
      },
      counterOfferPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        comment: "Customer's counter offer price",
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "Optional message from the service provider",
      },
      counterOfferMessage: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "Optional message from the customer's counter offer",
      },
      status: {
        type: DataTypes.ENUM("pending", "accepted", "counter_offered", "rejected", "expired"),
        defaultValue: "pending",
      },
      expiresAt: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: "When the bid expires",
      },
      acceptedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Bid",
      tableName: "Bids",
      timestamps: true,
      indexes: [
        {
          name: "idx_bids_service_request",
          fields: ["serviceRequestId"],
        },
        {
          name: "idx_bids_service_provider",
          fields: ["serviceProviderId"],
        },
        {
          name: "idx_bids_customer",
          fields: ["customerId"],
        },
        {
          name: "idx_bids_order",
          fields: ["orderId"],
        },
        {
          name: "idx_bids_status",
          fields: ["status"],
        },
        {
          name: "idx_bids_expires_at",
          fields: ["expiresAt"],
        },
      ],
    }
  );

  return Bid;
};
