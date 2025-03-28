"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      // Order belongs to a user (customer)
      Order.belongsTo(models.User, {
        foreignKey: "userId",
        as: "customer",
      });

      // Order belongs to a service provider
      Order.belongsTo(models.ServiceProvider, {
        foreignKey: "serviceProviderId",
        as: "serviceProvider",
      });

      // Order can have many services
      Order.belongsToMany(models.Service, {
        through: "OrderServices",
        foreignKey: "orderId",
        as: "services",
      });

      // Order can have many bids
      Order.hasMany(models.Bid, {
        foreignKey: "orderId",
        as: "bids",
      });
    }
  }

  Order.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      serviceProviderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "ServiceProviders",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      scheduledDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      scheduledTime: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0,
      },
      originalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        comment: "Original price before negotiation",
      },
      isNegotiated: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: "Whether the price was negotiated",
      },
      status: {
        type: DataTypes.ENUM(
          "pending",
          "accepted",
          "in_progress",
          "completed",
          "cancelled",
          "rejected"
        ),
        allowNull: false,
        defaultValue: "pending",
      },
      paymentStatus: {
        type: DataTypes.ENUM("pending", "completed", "refunded", "failed"),
        allowNull: false,
        defaultValue: "pending",
      },
      paymentMethod: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      rating: {
        type: DataTypes.DECIMAL(3, 1),
        allowNull: true,
        validate: {
          min: 1.0,
          max: 5.0,
        },
      },
      review: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      completedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      cancellationReason: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Order",
      tableName: "Orders",
      timestamps: true,
    }
  );

  return Order;
};
