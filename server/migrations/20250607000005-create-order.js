"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Orders", {
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
      serviceProviderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "ServiceProviders",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      scheduledDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      scheduledTime: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0,
      },
      status: {
        type: Sequelize.ENUM(
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
        type: Sequelize.ENUM("pending", "completed", "refunded", "failed"),
        allowNull: false,
        defaultValue: "pending",
      },
      paymentMethod: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      rating: {
        type: Sequelize.DECIMAL(3, 1),
        allowNull: true,
      },
      review: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      completedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      cancellationReason: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
    });

    // Add indexes for better performance
    await queryInterface.addIndex("Orders", ["userId"]);
    await queryInterface.addIndex("Orders", ["serviceProviderId"]);
    await queryInterface.addIndex("Orders", ["status"]);
    await queryInterface.addIndex("Orders", ["paymentStatus"]);
    await queryInterface.addIndex("Orders", ["scheduledDate"]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Orders");
  },
};
