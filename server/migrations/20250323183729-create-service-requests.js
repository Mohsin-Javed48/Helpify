"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ServiceRequests", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      customerId: {
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
        allowNull: true,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      services: {
        type: Sequelize.JSON,
        allowNull: false,
        comment: "Array of services with name, price, and quantity",
      },
      scheduledDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      scheduledTime: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address: {
        type: Sequelize.JSON,
        allowNull: false,
        comment:
          "Address object with street, city, state, zip, country, and coordinates",
      },
      status: {
        type: Sequelize.ENUM("pending", "accepted", "completed", "cancelled"),
        defaultValue: "pending",
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      finalAmount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0,
      },
      paymentStatus: {
        type: Sequelize.ENUM("pending", "paid", "refunded"),
        defaultValue: "pending",
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
    await queryInterface.addIndex("ServiceRequests", ["customerId"], {
      name: "idx_service_requests_customer",
    });
    await queryInterface.addIndex("ServiceRequests", ["serviceProviderId"], {
      name: "idx_service_requests_provider",
    });
    await queryInterface.addIndex("ServiceRequests", ["status"], {
      name: "idx_service_requests_status",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ServiceRequests");
  },
};
