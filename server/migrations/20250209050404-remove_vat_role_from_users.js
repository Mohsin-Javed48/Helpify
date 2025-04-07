'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'vatNumber');
    await queryInterface.removeColumn('Users', 'role');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'vatNumber', {
      type: Sequelize.STRING,
      allowNull: true,
    });

   
  }
};
