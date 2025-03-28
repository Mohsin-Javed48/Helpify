const { Sequelize } = require("sequelize");
require("dotenv").config();

async function checkEnums() {
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

    // Get all enum types in the database
    const enums = await sequelize.query(
      `
      SELECT
        t.typname,
        string_agg(e.enumlabel, ', ' ORDER BY e.enumsortorder) AS enum_values
      FROM
        pg_type t
        JOIN pg_enum e ON t.oid = e.enumtypid
      GROUP BY
        t.typname;
    `,
      { type: Sequelize.QueryTypes.SELECT }
    );

    console.log("Enums:", enums);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await sequelize.close();
  }
}

checkEnums();
