"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("ServiceProviders", {
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
      designation: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "Service provider job title (e.g., Plumber, Electrician)",
      },
      location: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      ratePerHour: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0,
      },
      totalOrders: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      completedOrders: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      totalEarnings: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0.0,
      },
      rating: {
        type: Sequelize.DECIMAL(3, 2),
        defaultValue: 0.0,
      },
      experience: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        comment: "Experience in years",
      },
      status: {
        type: Sequelize.ENUM("active", "inactive", "pending"),
        defaultValue: "pending",
      },
      isVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      availabilityStatus: {
        type: Sequelize.ENUM("available", "busy", "offline"),
        defaultValue: "offline",
      },
      joinedDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      lastActive: {
        type: Sequelize.DATE,
        allowNull: true,
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

    // Add indexes for better performance
    await queryInterface.addIndex("ServiceProviders", ["userId"]);
    await queryInterface.addIndex("ServiceProviders", ["status"]);
    await queryInterface.addIndex("ServiceProviders", ["designation"]);
    await queryInterface.addIndex("ServiceProviders", ["availabilityStatus"]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("ServiceProviders");
  },
};
