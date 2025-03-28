"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    static associate(models) {
      // An admin is associated with a user
      Admin.belongsTo(models.User, { foreignKey: "userId" });

      // Admin can have many activity logs
      Admin.hasMany(models.ActivityLog, {
        foreignKey: "adminId",
        as: "activityLogs",
      });
    }
  }

  Admin.init(
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
      },
      role: {
        type: DataTypes.ENUM("super_admin", "admin", "moderator"),
        allowNull: false,
        defaultValue: "admin",
      },
      permissions: {
        type: DataTypes.JSONB,
        allowNull: true,
        defaultValue: {
          users: { view: true, create: false, update: false, delete: false },
          orders: { view: true, update: true, delete: false },
          serviceProviders: {
            view: true,
            create: false,
            update: true,
            delete: false,
          },
          complaints: { view: true, resolve: true, delete: false },
          settings: { view: false, update: false },
        },
      },
      status: {
        type: DataTypes.ENUM("active", "inactive", "suspended"),
        allowNull: false,
        defaultValue: "active",
      },
      lastLogin: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Admin",
      tableName: "Admins",
    }
  );

  return Admin;
};
