const { exec } = require("child_process");
const path = require("path");

// Define migrations in the correct order
const migrations = [
  // Base tables
  "20250209052035-create-role.js",
  "20250209052714-add-timestamps-to-roles.js",
  "20240927101520-create-user.js",
  "20250209053503-add-roleId-to-users.js",
  "20241216182727-add-forget-token-to-users.js",
  "20241218111402-add-column-to-Users.js",
  "20250209050404-remove_vat_role_from_users.js",

  // Service-related tables
  "20250209070331-create-service.js",
  "20250330074722-create-service-provider.js",

  // Order-related tables
  "20250330074802-create-order.js",
  "20250330074808-create-order-service.js",
  "20250330200000-modify-orders.js",
  "20250330200100-modify-order-services.js",
  "20250401000000-update-order-service-provider.js",

  // Bid-related tables
  "20250501000000-create-order-bids.js",

  // Additional features
  "20240331_create_rejected_orders.js",
  "20240402_add_status_to_users.js",
  "20250403160142-create-complains-table.js",
  "20250403190402-add-status-and-timestamps-to-complains.js",
  "20250403190403-allow-null-userid-in-complains.js",
];

// Function to create the database if it doesn't exist
function createDatabase() {
  return new Promise((resolve, reject) => {
    console.log("Creating database if it doesn't exist...");

    exec("npx sequelize-cli db:create", (error, stdout, stderr) => {
      if (error && !stderr.includes("already exists")) {
        console.error("Error creating database:");
        console.error(stderr);
        return reject(error);
      }
      console.log(stdout || "Database already exists.");
      resolve();
    });
  });
}

// Function to run all migrations
function runMigrations() {
  return new Promise((resolve, reject) => {
    console.log("Running migrations...");

    exec("npx sequelize-cli db:migrate", (error, stdout, stderr) => {
      if (error) {
        console.error("Error running migrations:");
        console.error(stderr);
        return reject(error);
      }
      console.log(stdout);
      resolve();
    });
  });
}

// Main function
async function main() {
  try {
    // First, create the database
    await createDatabase();

    // Then run all migrations
    await runMigrations();

    console.log("Database setup complete!");
  } catch (error) {
    console.error("Database setup failed:", error);
    process.exit(1);
  }
}

main();
