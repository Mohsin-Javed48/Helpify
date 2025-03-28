"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Get customer users (roleId = 3)
    const customers = await queryInterface.sequelize.query(
      'SELECT id FROM "Users" WHERE "roleId" = 3',
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (customers.length === 0) {
      console.log("No customer users found. Using any available users.");
      const users = await queryInterface.sequelize.query(
        'SELECT id FROM "Users" LIMIT 2',
        { type: Sequelize.QueryTypes.SELECT }
      );

      if (users.length === 0) {
        console.log("No users found. Skipping order seed.");
        return;
      }

      customers.push(...users);
    }

    // Get service providers
    const serviceProviders = await queryInterface.sequelize.query(
      'SELECT id FROM "ServiceProviders" LIMIT 5',
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (serviceProviders.length === 0) {
      console.log("No service providers found. Skipping order seed.");
      return;
    }

    // Get services
    const services = await queryInterface.sequelize.query(
      'SELECT id, price, name FROM "Services" LIMIT 10',
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (services.length === 0) {
      console.log("No services found. Skipping order seed.");
      return;
    }

    // Sample addresses
    const addresses = [
      "123 Main St, Lahore, Pakistan",
      "456 Oak Avenue, Karachi, Pakistan",
      "789 Pine Road, Islamabad, Pakistan",
      "321 Elm Boulevard, Lahore, Pakistan",
      "654 Maple Lane, Karachi, Pakistan",
    ];

    // Sample time slots
    const timeSlots = [
      "09:00 AM - 11:00 AM",
      "11:00 AM - 01:00 PM",
      "01:00 PM - 03:00 PM",
      "03:00 PM - 05:00 PM",
      "05:00 PM - 07:00 PM",
    ];

    // Sample payment methods
    const paymentMethods = [
      "cash",
      "credit_card",
      "bank_transfer",
      "online_payment",
    ];

    // Sample order titles
    const orderTitles = [
      "Home Maintenance",
      "Emergency Repair",
      "Regular Service",
      "Installation Work",
      "Plumbing Services",
      "Electrical Repair",
      "Painting Job",
      "Garden Maintenance",
      "Furniture Assembly",
      "Deep Cleaning",
    ];

    // Create orders
    const orders = [];
    const now = new Date();

    // Create 10 orders with different statuses
    for (let i = 0; i < 10; i++) {
      const customerId =
        customers[Math.floor(Math.random() * customers.length)].id;
      const providerId =
        serviceProviders[Math.floor(Math.random() * serviceProviders.length)]
          .id;
      const address = addresses[Math.floor(Math.random() * addresses.length)];
      const timeSlot = timeSlots[Math.floor(Math.random() * timeSlots.length)];
      const paymentMethod =
        paymentMethods[Math.floor(Math.random() * paymentMethods.length)];
      const title = orderTitles[Math.floor(Math.random() * orderTitles.length)];

      // Create scheduled date (between today and 7 days from now)
      const scheduledDate = new Date(now);
      scheduledDate.setDate(
        scheduledDate.getDate() + Math.floor(Math.random() * 7)
      );

      // Determine order status
      let status, paymentStatus, completedAt, rating, review;

      if (i < 2) {
        // Pending orders
        status = "pending";
        paymentStatus = "pending";
      } else if (i < 4) {
        // Accepted orders
        status = "accepted";
        paymentStatus = "pending";
      } else if (i < 6) {
        // In progress orders
        status = "in_progress";
        paymentStatus = "pending";
      } else if (i < 8) {
        // Completed orders
        status = "completed";
        paymentStatus = "completed";
        completedAt = new Date(scheduledDate);
        completedAt.setHours(completedAt.getHours() + 2);
        rating = (Math.random() * 2 + 3).toFixed(1); // Random rating between 3 and 5
        review = [
          "Great service!",
          "Very professional",
          "Excellent work",
          "Highly recommended",
        ][Math.floor(Math.random() * 4)];
      } else {
        // Cancelled/rejected orders
        status = i % 2 === 0 ? "cancelled" : "rejected";
        paymentStatus = i % 2 === 0 ? "refunded" : "failed";
      }

      // Initial order with 0 amount (will be updated after services are added)
      orders.push({
        userId: customerId,
        serviceProviderId: providerId,
        title,
        description: `Booking for ${title.toLowerCase()}`,
        address,
        scheduledDate,
        scheduledTime: timeSlot,
        amount: 0, // To be updated after adding services
        status,
        paymentStatus,
        paymentMethod,
        rating: rating || null,
        review: review || null,
        completedAt: completedAt || null,
        cancellationReason:
          status === "cancelled" || status === "rejected"
            ? "Schedule conflict"
            : null,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // Insert orders
    const insertedOrders = await queryInterface.bulkInsert("Orders", orders, {
      returning: true,
    });

    // Create order services (1-3 services per order)
    const orderServices = [];

    for (let i = 0; i < insertedOrders.length; i++) {
      const order = insertedOrders[i];
      const orderId = order.id;

      // Decide how many services for this order (1-3)
      const numServices = Math.floor(Math.random() * 3) + 1;

      // Shuffle services array and take first numServices
      const shuffledServices = [...services]
        .sort(() => 0.5 - Math.random())
        .slice(0, numServices);

      let orderTotal = 0;

      // Add services to the order
      shuffledServices.forEach((service) => {
        const quantity = Math.floor(Math.random() * 2) + 1; // 1 or 2 quantity
        const price = parseFloat(service.price);
        const subtotal = price * quantity;

        orderServices.push({
          orderId,
          serviceId: service.id,
          quantity,
          price,
          subtotal,
          notes: `Service notes for ${service.name}`,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        orderTotal += subtotal;
      });

      // Update order amount with total from services
      await queryInterface.sequelize.query(
        `UPDATE "Orders" SET amount = ${orderTotal} WHERE id = ${orderId}`,
        { type: Sequelize.QueryTypes.UPDATE }
      );
    }

    // Insert order services
    return queryInterface.bulkInsert("OrderServices", orderServices, {});
  },

  down: async (queryInterface, Sequelize) => {
    // Delete order services
    await queryInterface.bulkDelete("OrderServices", null, {});

    // Delete orders
    return queryInterface.bulkDelete("Orders", null, {});
  },
};
