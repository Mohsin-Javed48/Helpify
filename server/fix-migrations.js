const { Sequelize } = require('sequelize');
require('dotenv').config();

async function fixMigrations() {
  const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: process.env.DB_DIALECT
    }
  );

  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Delete the problematic migration entry
    const result = await sequelize.query('DELETE FROM "SequelizeMeta" WHERE name = \'20250607000000-create-admin.js\';');
    console.log('Deleted migration entry:', result);

    console.log('Migration fixed successfully!');
  } catch (error) {
    console.error('Unable to fix migration:', error);
  } finally {
    await sequelize.close();
  }
}

fixMigrations(); 