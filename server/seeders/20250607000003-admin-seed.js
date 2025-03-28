"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // First, find users with the admin role (roleId = 1)
    const adminUsers = await queryInterface.sequelize.query(
      'SELECT id FROM "Users" WHERE "roleId" = 1 LIMIT 3',
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (adminUsers.length === 0) {
      console.log("No admin users found. Skipping admin seed.");
      return;
    }

    // Create admin records
    const admins = adminUsers.map((user, index) => {
      // Assign different roles based on index
      let role, permissions;
      if (index === 0) {
        role = "super_admin";
        permissions = JSON.stringify({
          users: { view: true, create: true, update: true, delete: true },
          orders: { view: true, update: true, delete: true },
          serviceProviders: {
            view: true,
            create: true,
            update: true,
            delete: true,
          },
          complaints: { view: true, resolve: true, delete: true },
          settings: { view: true, update: true },
        });
      } else {
        role = "admin";
        permissions = JSON.stringify(
          index === 1
            ? {
                users: {
                  view: true,
                  create: true,
                  update: true,
                  delete: false,
                },
                orders: { view: true, update: true, delete: false },
                serviceProviders: {
                  view: true,
                  create: false,
                  update: true,
                  delete: false,
                },
                complaints: { view: true, resolve: true, delete: false },
                settings: { view: true, update: false },
              }
            : {
                users: {
                  view: true,
                  create: false,
                  update: false,
                  delete: false,
                },
                orders: { view: true, update: true, delete: false },
                serviceProviders: {
                  view: true,
                  create: false,
                  update: false,
                  delete: false,
                },
                complaints: { view: true, resolve: true, delete: false },
                settings: { view: false, update: false },
              }
        );
      }

      return {
        userId: user.id,
        role: role,
        permissions: permissions,
        status: "active",
        lastLogin: new Date(2023, 5, 15 + index), // June 15, 2023 + index days
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    return queryInterface.bulkInsert("Admins", admins, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Admins", null, {});
  },
};
