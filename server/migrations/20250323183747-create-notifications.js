"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Notifications", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      type: {
        type: Sequelize.ENUM(
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
        type: Sequelize.TEXT,
        allowNull: false,
      },
      data: {
        type: Sequelize.JSON,
        allowNull: true,
        defaultValue: {},
      },
      isRead: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    // Add indexes
    await queryInterface.addIndex("Notifications", ["userId"], {
      name: "idx_notifications_user",
    });
    await queryInterface.addIndex("Notifications", ["isRead"], {
      name: "idx_notifications_read",
    });
    await queryInterface.addIndex("Notifications", ["createdAt"], {
      name: "idx_notifications_created",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Notifications");
  },
};
