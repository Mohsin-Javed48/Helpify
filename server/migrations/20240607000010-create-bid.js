"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Bids", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
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
      orderId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Orders",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      originalPrice: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        comment: "Original price before bidding",
      },
      bidPrice: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        comment: "Provider's bid price",
      },
      counterOfferPrice: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
        comment: "Customer's counter offer price",
      },
      message: {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: "Optional message from the service provider",
      },
      status: {
        type: Sequelize.ENUM(
          "pending",
          "accepted",
          "counter_offered",
          "rejected",
          "expired"
        ),
        defaultValue: "pending",
      },
      expiresAt: {
        type: Sequelize.DATE,
        allowNull: true,
        comment: "When the bid expires",
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
    await queryInterface.addIndex("Bids", ["serviceProviderId"], {
      name: "idx_bids_service_provider",
    });

    await queryInterface.addIndex("Bids", ["customerId"], {
      name: "idx_bids_customer",
    });

    await queryInterface.addIndex("Bids", ["orderId"], {
      name: "idx_bids_order",
    });

    await queryInterface.addIndex("Bids", ["status"], {
      name: "idx_bids_status",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Bids");
  },
};
