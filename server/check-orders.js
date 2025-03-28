const { Sequelize } = require("sequelize");
require("dotenv").config();

async function checkOrders() {
  const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: process.env.DB_DIALECT,
    }
  );

  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    // Check Orders table
    const orders = await sequelize.query('SELECT * FROM "Orders" LIMIT 5;', {
      type: Sequelize.QueryTypes.SELECT,
    });
    console.log("Orders:", orders);

    // Check total number of orders
    const orderCount = await sequelize.query('SELECT COUNT(*) FROM "Orders";', {
      type: Sequelize.QueryTypes.SELECT,
    });
    console.log("Total Orders:", orderCount[0].count);

    // Check OrderServices table
    const orderServices = await sequelize.query(
      'SELECT * FROM "OrderServices" LIMIT 5;',
      { type: Sequelize.QueryTypes.SELECT }
    );
    console.log("OrderServices:", orderServices);

    // Check total number of order services
    const orderServiceCount = await sequelize.query(
      'SELECT COUNT(*) FROM "OrderServices";',
      { type: Sequelize.QueryTypes.SELECT }
    );
    console.log("Total OrderServices:", orderServiceCount[0].count);

    // Get order details with services for one order
    const orderWithServices = await sequelize.query(
      `
      SELECT o.id AS order_id, o.title, o.status, s.name AS service_name, 
             os.quantity, os.price, os.subtotal
      FROM "Orders" o
      JOIN "OrderServices" os ON o.id = os."orderId"
      JOIN "Services" s ON os."serviceId" = s.id
      WHERE o.id = (SELECT id FROM "Orders" LIMIT 1);
    `,
      { type: Sequelize.QueryTypes.SELECT }
    );

    console.log("\nOrder with services details:");
    console.log(orderWithServices);
  } catch (error) {
    console.error("Error checking orders:", error);
  } finally {
    await sequelize.close();
  }
}

checkOrders();
