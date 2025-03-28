"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ServiceRequest extends Model {
    static associate(models) {
      // Define associations
      ServiceRequest.belongsTo(models.User, {
        foreignKey: "customerId",
        as: "customer",
      });
      ServiceRequest.belongsTo(models.User, {
        foreignKey: "serviceProviderId",
        as: "serviceProvider",
      });
      ServiceRequest.hasMany(models.Bid, {
        foreignKey: "serviceRequestId",
        as: "bids",
      });
    }
  }

  ServiceRequest.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      customerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      serviceProviderId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Users",
          key: "id",
        },
      },
      services: {
        type: DataTypes.JSON,
        allowNull: false,
        comment: "Array of services with name, price, and quantity",
      },
      scheduledDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      scheduledTime: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.JSON,
        allowNull: false,
        comment:
          "Address object with street, city, state, zip, country, and coordinates",
      },
      status: {
        type: DataTypes.ENUM("pending", "accepted", "completed", "cancelled"),
        defaultValue: "pending",
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      finalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0,
      },
      paymentStatus: {
        type: DataTypes.ENUM("pending", "paid", "refunded"),
        defaultValue: "pending",
      },
    },
    {
      sequelize,
      modelName: "ServiceRequest",
      tableName: "ServiceRequests",
      timestamps: true,
      indexes: [
        {
          name: "idx_service_requests_customer",
          fields: ["customerId"],
        },
        {
          name: "idx_service_requests_provider",
          fields: ["serviceProviderId"],
        },
        {
          name: "idx_service_requests_status",
          fields: ["status"],
        },
      ],
    }
  );

  // Instance method to calculate total estimated price
  ServiceRequest.prototype.getTotalEstimatedPrice = function () {
    if (!this.services || !Array.isArray(this.services)) return 0;

    return this.services.reduce((total, service) => {
      return total + (service.price || 0) * (service.quantity || 1);
    }, 0);
  };

  return ServiceRequest;
};
