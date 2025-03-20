'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Services', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false, // Name is required
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true, // Description is optional
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false, // Price is required
      },
      providerId: {
        type: Sequelize.INTEGER,
        allowNull: false, // Provider ID is required
        references: {
          model: 'Users', // References the Users table
          key: 'id', // References the primary key in the Users table
        },
        onUpdate: 'CASCADE', // If the User ID is updated, update this field as well
        onDelete: 'CASCADE', // If the User is deleted, delete their services
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), // Default value for createdAt
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), // Default value for updatedAt
      },
    });

   
  },

  down: async (queryInterface, Sequelize) => {
    // Drop the Services table
    await queryInterface.dropTable('Services');
  },
};