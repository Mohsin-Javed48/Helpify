const { Sequelize } = require("sequelize");
require("dotenv").config();

async function checkColumns() {
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

    // List all tables
    const tables = await sequelize.query(
      `SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = 'public'`,
      { type: Sequelize.QueryTypes.SELECT }
    );
    console.log(
      "Tables:",
      tables.map((t) => t.tablename)
    );

    // For each table, get column information
    for (const table of tables) {
      const tableName = table.tablename;
      try {
        const columns = await sequelize.query(
          `SELECT column_name, data_type, character_maximum_length 
           FROM INFORMATION_SCHEMA.COLUMNS 
           WHERE table_name = '${tableName}'`,
          { type: Sequelize.QueryTypes.SELECT }
        );
        console.log(`\nColumns for table ${tableName}:`, columns);
      } catch (err) {
        console.error(
          `Error getting columns for table ${tableName}:`,
          err.message
        );
      }
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await sequelize.close();
  }
}

checkColumns();
