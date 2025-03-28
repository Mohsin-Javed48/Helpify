"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add serviceRequestId to Bids table
    await queryInterface.addColumn("Bids", "serviceRequestId", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "ServiceRequests",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });

    // Add counterOfferMessage to Bids table
    await queryInterface.addColumn("Bids", "counterOfferMessage", {
      type: Sequelize.TEXT,
      allowNull: true,
      comment: "Optional message from the customer's counter offer",
    });

    // Add acceptedAt to Bids table
    await queryInterface.addColumn("Bids", "acceptedAt", {
      type: Sequelize.DATE,
      allowNull: true,
    });

    // Create index for serviceRequestId
    await queryInterface.addIndex("Bids", ["serviceRequestId"], {
      name: "idx_bids_service_request",
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove added columns
    await queryInterface.removeColumn("Bids", "serviceRequestId");
    await queryInterface.removeColumn("Bids", "counterOfferMessage");
    await queryInterface.removeColumn("Bids", "acceptedAt");
  },
};
