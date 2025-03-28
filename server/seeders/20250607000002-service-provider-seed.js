"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // First, find users with the service provider role (roleId = 2)
    const serviceProviderUsers = await queryInterface.sequelize.query(
      'SELECT id FROM "Users" WHERE "roleId" = 2 LIMIT 5',
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (serviceProviderUsers.length === 0) {
      console.log(
        "No service provider users found. Skipping service provider seed."
      );
      return;
    }

    // Sample designations for service providers
    const designations = [
      "Plumber",
      "Electrician",
      "Painter",
      "Gardner",
      "Handyman",
    ];
    const locations = [
      "New Colony, Lahore",
      "Johar Town, Karachi",
      "Gulberg, Islamabad",
      "Model Town, Lahore",
      "DHA, Karachi",
    ];

    // Create service provider records
    const serviceProviders = serviceProviderUsers.map((user, index) => ({
      userId: user.id,
      designation: designations[index % designations.length],
      location: locations[index % locations.length],
      ratePerHour: (Math.floor(Math.random() * 30) + 20) * 10, // Random rate between 200-500
      totalOrders: Math.floor(Math.random() * 50),
      completedOrders: Math.floor(Math.random() * 40),
      totalEarnings: Math.floor(Math.random() * 50000),
      rating: Math.random() * 2 + 3, // Random rating between 3-5
      experience: Math.floor(Math.random() * 10) + 1,
      status: index < 3 ? "active" : "pending",
      isVerified: index < 3,
      availabilityStatus: index < 2 ? "available" : "offline",
      joinedDate: new Date(2022, 10, 25 + index), // November 25, 2022 + index days
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    return queryInterface.bulkInsert("ServiceProviders", serviceProviders, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("ServiceProviders", null, {});
  },
};
