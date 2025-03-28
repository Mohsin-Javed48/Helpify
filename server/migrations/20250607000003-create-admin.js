"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // First drop the existing Admins table
    await queryInterface.dropTable("Admins", { cascade: true });

    // Then create the new Admins table
    await queryInterface.createTable("Admins", {
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
      role: {
        type: Sequelize.ENUM("super_admin", "admin", "moderator"),
        allowNull: false,
        defaultValue: "admin",
      },
      permissions: {
        type: Sequelize.JSONB,
        allowNull: true,
        defaultValue: {
          users: { view: true, create: false, update: false, delete: false },
          orders: { view: true, update: true, delete: false },
          serviceProviders: {
            view: true,
            create: false,
            update: true,
            delete: false,
          },
          complaints: { view: true, resolve: true, delete: false },
          settings: { view: false, update: false },
        },
      },
      status: {
        type: Sequelize.ENUM("active", "inactive", "suspended"),
        allowNull: false,
        defaultValue: "active",
      },
      lastLogin: {
        type: Sequelize.DATE,
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
    await queryInterface.addIndex("Admins", ["userId"]);
    await queryInterface.addIndex("Admins", ["role"]);
    await queryInterface.addIndex("Admins", ["status"]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Admins");
  },
};
