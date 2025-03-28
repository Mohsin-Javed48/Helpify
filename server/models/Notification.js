"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    static associate(models) {
      // Define associations
      Notification.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
    }
  }

  Notification.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      type: {
        type: DataTypes.ENUM(
          "NEW_BID",
          "BID_ACCEPTED",
          "BID_REJECTED",
          "COUNTER_OFFER",
          "SERVICE_REQUEST",
          "SERVICE_COMPLETED",
          "PAYMENT_RECEIVED",
          "SYSTEM"
        ),
        allowNull: false,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      data: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: {},
      },
      isRead: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Notification",
      tableName: "Notifications",
      timestamps: true,
      indexes: [
        {
          name: "idx_notifications_user",
          fields: ["userId"],
        },
        {
          name: "idx_notifications_read",
          fields: ["isRead"],
        },
        {
          name: "idx_notifications_created",
          fields: ["createdAt"],
        },
      ],
    }
  );

  // Class method to mark notifications as read
  Notification.markAsRead = async function (userId, notificationIds) {
    return this.update(
      { isRead: true },
      {
        where: {
          userId,
          id: { [sequelize.Sequelize.Op.in]: notificationIds },
        },
      }
    );
  };

  // Class method to mark all notifications as read for a user
  Notification.markAllAsRead = async function (userId) {
    return this.update(
      { isRead: true },
      {
        where: {
          userId,
          isRead: false,
        },
      }
    );
  };

  // Class method to delete old notifications
  Notification.deleteOldNotifications = async function (days = 30) {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    return this.destroy({
      where: {
        createdAt: { [sequelize.Sequelize.Op.lt]: cutoffDate },
      },
    });
  };

  return Notification;
};
