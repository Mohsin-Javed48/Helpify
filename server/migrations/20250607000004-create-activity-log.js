"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("ActivityLogs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      adminId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Admins",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      actionType: {
        type: Sequelize.ENUM(
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
        type: Sequelize.ENUM(
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
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      details: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      ipAddress: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      timestamp: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
    });

    // Add indexes for better performance
    await queryInterface.addIndex("ActivityLogs", ["adminId"]);
    await queryInterface.addIndex("ActivityLogs", ["actionType"]);
    await queryInterface.addIndex("ActivityLogs", ["entityType", "entityId"]);
    await queryInterface.addIndex("ActivityLogs", ["timestamp"]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("ActivityLogs");
  },
};
