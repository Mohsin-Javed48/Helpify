"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ActivityLog extends Model {
    static associate(models) {
      // ActivityLog belongs to an admin
      ActivityLog.belongsTo(models.Admin, {
        foreignKey: "adminId",
        as: "admin",
      });
    }
  }

  ActivityLog.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      adminId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Admins",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      actionType: {
        type: DataTypes.ENUM(
          "create",
          "update",
          "delete",
          "view",
          "login",
          "logout",
          "approve",
          "reject",
          "suspend"
        ),
        allowNull: false,
      },
      entityType: {
        type: DataTypes.ENUM(
          "user",
          "service_provider",
          "order",
          "complaint",
          "service",
          "system_setting"
        ),
        allowNull: false,
      },
      entityId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      details: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      ipAddress: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "ActivityLog",
      tableName: "ActivityLogs",
      timestamps: true,
      createdAt: "timestamp",
      updatedAt: false,
    }
  );

  return ActivityLog;
};
