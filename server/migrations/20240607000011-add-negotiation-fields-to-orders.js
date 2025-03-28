"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Orders", "originalAmount", {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true,
      comment: "Original price before negotiation",
    });

    await queryInterface.addColumn("Orders", "isNegotiated", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: "Whether the price was negotiated",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Orders", "originalAmount");
    await queryInterface.removeColumn("Orders", "isNegotiated");
  },
};
