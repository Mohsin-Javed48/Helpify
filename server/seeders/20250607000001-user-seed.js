"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Check if roles exist
    const roles = await queryInterface.sequelize.query(
      'SELECT id, name FROM "Roles";',
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (roles.length === 0) {
      console.log("No roles found. Creating default roles.");
      // Create default roles if they don't exist
      await queryInterface.bulkInsert(
        "Roles",
        [
          {
            id: 1,
            name: "admin",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 2,
            name: "service_provider",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 3,
            name: "customer",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {}
      );
    }

    // Get role IDs
    const adminRoleId =
      roles.find((role) => role.name.toLowerCase() === "admin")?.id || 1;
    const serviceProviderRoleId =
      roles.find((role) => role.name.toLowerCase() === "provider")?.id || 2;
    const customerRoleId =
      roles.find((role) => role.name.toLowerCase() === "user")?.id || 3;

    // Create users with hashed passwords
    const users = [
      // Admin users
      {
        firstName: "Admin",
        lastName: "User",
        email: "admin@helpify.com",
        password: await bcrypt.hash("Admin123!", 10),
        roleId: adminRoleId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Super",
        lastName: "Admin",
        email: "superadmin@helpify.com",
        password: await bcrypt.hash("Admin123!", 10),
        roleId: adminRoleId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Moderator",
        lastName: "Admin",
        email: "moderator@helpify.com",
        password: await bcrypt.hash("Admin123!", 10),
        roleId: adminRoleId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Service Provider users
      {
        firstName: "John",
        lastName: "Plumber",
        email: "john@plumbing.com",
        password: await bcrypt.hash("Service123!", 10),
        roleId: serviceProviderRoleId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Sarah",
        lastName: "Electrician",
        email: "sarah@electrical.com",
        password: await bcrypt.hash("Service123!", 10),
        roleId: serviceProviderRoleId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Mike",
        lastName: "Painter",
        email: "mike@painting.com",
        password: await bcrypt.hash("Service123!", 10),
        roleId: serviceProviderRoleId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Lisa",
        lastName: "Gardener",
        email: "lisa@garden.com",
        password: await bcrypt.hash("Service123!", 10),
        roleId: serviceProviderRoleId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "David",
        lastName: "Handyman",
        email: "david@handyman.com",
        password: await bcrypt.hash("Service123!", 10),
        roleId: serviceProviderRoleId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Customer users
      {
        firstName: "Alice",
        lastName: "Customer",
        email: "alice@example.com",
        password: await bcrypt.hash("Customer123!", 10),
        roleId: customerRoleId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Bob",
        lastName: "Customer",
        email: "bob@example.com",
        password: await bcrypt.hash("Customer123!", 10),
        roleId: customerRoleId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    return queryInterface.bulkInsert("Users", users, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
