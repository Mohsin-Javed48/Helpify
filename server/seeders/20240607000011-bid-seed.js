"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Get existing users, service providers and orders to reference
    const users = await queryInterface.sequelize.query(
      "SELECT id FROM Users WHERE roleId = 3 LIMIT 5",
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const serviceProviders = await queryInterface.sequelize.query(
      "SELECT id FROM ServiceProviders LIMIT 5",
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const orders = await queryInterface.sequelize.query(
      "SELECT id FROM Orders LIMIT 3",
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (users.length === 0 || serviceProviders.length === 0) {
      console.log("No users or service providers found for bid seeding");
      return;
    }

    const now = new Date();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 1); // Expires in 1 day

    const bidData = [];

    // Generate a mix of bids with different statuses
    const statuses = ["pending", "accepted", "counter_offered", "rejected"];
    const messages = [
      "I can provide quality service at a competitive rate",
      "I have extensive experience with these types of services",
      "I guarantee satisfaction with my work",
      "I can complete this job efficiently and professionally",
      "I offer the best value for your money",
    ];

    // For each order, create multiple bids from different service providers
    orders.forEach((order, orderIndex) => {
      // Use different service providers for each order
      serviceProviders.forEach((provider, providerIndex) => {
        if (orderIndex < users.length) {
          const userId = users[orderIndex].id;
          const originalPrice = 1000 + Math.floor(Math.random() * 5000); // Random price between 1000-6000

          // Create a bid with random attributes
          const bid = {
            serviceProviderId: provider.id,
            customerId: userId,
            orderId: order.id,
            originalPrice: originalPrice,
            bidPrice: originalPrice * (0.8 + Math.random() * 0.3), // 80-110% of original price
            counterOfferPrice:
              Math.random() > 0.7 ? originalPrice * 0.75 : null, // 30% chance of counter offer
            message: messages[Math.floor(Math.random() * messages.length)],
            status: statuses[Math.floor(Math.random() * statuses.length)],
            expiresAt: expiresAt,
            createdAt: now,
            updatedAt: now,
          };

          // Ensure some consistency in the data
          if (bid.status === "counter_offered" && !bid.counterOfferPrice) {
            bid.counterOfferPrice = bid.bidPrice * 0.9; // Set a counter offer if status is counter_offered
          }

          if (bid.status === "accepted") {
            // Only one bid per order should be accepted
            const existingAccepted = bidData.find(
              (b) => b.orderId === order.id && b.status === "accepted"
            );

            if (existingAccepted) {
              bid.status = "rejected";
            }
          }

          bidData.push(bid);
        }
      });
    });

    await queryInterface.bulkInsert("Bids", bidData);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Bids", null, {});
  },
};
