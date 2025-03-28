const { Sequelize } = require("sequelize");
require("dotenv").config();

async function checkData() {
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

    // Check Users table
    const users = await sequelize.query(
      'SELECT id, "firstName", "lastName", email, "roleId" FROM "Users" LIMIT 10;',
      { type: Sequelize.QueryTypes.SELECT }
    );
    console.log("Users:", users);

    // Check Roles table
    const roles = await sequelize.query('SELECT * FROM "Roles";', {
      type: Sequelize.QueryTypes.SELECT,
    });
    console.log("Roles:", roles);

    // Check ServiceProviders table
    try {
      const serviceProviders = await sequelize.query(
        'SELECT * FROM "ServiceProviders" LIMIT 5;',
        { type: Sequelize.QueryTypes.SELECT }
      );
      console.log("ServiceProviders:", serviceProviders);
    } catch (error) {
      console.log("Error querying ServiceProviders:", error.message);
    }

    // Check Admins table
    try {
      const admins = await sequelize.query('SELECT * FROM "Admins" LIMIT 5;', {
        type: Sequelize.QueryTypes.SELECT,
      });
      console.log("Admins:", admins);
    } catch (error) {
      console.log("Error querying Admins:", error.message);
    }

    // Check ActivityLogs table
    try {
      const activityLogs = await sequelize.query(
        'SELECT * FROM "ActivityLogs" LIMIT 5;',
        { type: Sequelize.QueryTypes.SELECT }
      );
      console.log("ActivityLogs:", activityLogs);
    } catch (error) {
      console.log("Error querying ActivityLogs:", error.message);
    }
  } catch (error) {
    console.error("Error checking data:", error);
  } finally {
    await sequelize.close();
  }
}

checkData();
