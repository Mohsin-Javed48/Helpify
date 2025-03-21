"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Services", "orderId");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("Services", "orderId", {
      type: Sequelize.INTEGER,
      allowNull: true, // Set this based on your previous schema
    });
  },
};
