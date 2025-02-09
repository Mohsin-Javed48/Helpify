'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    static associate(models) {
      // Define associations here
      Service.belongsTo(models.User, {
        foreignKey: 'providerId', // Foreign key in the Services table
        as: 'provider', // Alias for the association
      });
    }
  }
  Service.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false, // Name is required
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true, // Description is optional
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false, // Price is required
        validate: {
          min: 0, // Price cannot be negative
        },
      },
      providerId: {
        type: DataTypes.INTEGER,
        allowNull: false, // Provider ID is required
        references: {
          model: 'Users', // References the Users table
          key: 'id', // References the primary key in the Users table
        },
      },
    },
    {
      sequelize,
      modelName: 'Service',
      tableName: 'Services', // Explicitly set the table name
      timestamps: true, // Enable createdAt and updatedAt
    }
  );
  return Service;
};