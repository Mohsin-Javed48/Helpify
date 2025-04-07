const fs = require("fs");
const path = require("path");

// Define migrations in the correct order
const migrationOrder = [
  // Base tables
  { file: "20250209052035-create-role.js", newPrefix: "20240901000001" },
  {
    file: "20250209052714-add-timestamps-to-roles.js",
    newPrefix: "20240901000002",
  },
  { file: "20240927101520-create-user.js", newPrefix: "20240901000003" },
  {
    file: "20250209053503-add-roleId-to-users.js",
    newPrefix: "20240901000004",
  },
  {
    file: "20241216182727-add-forget-token-to-users.js",
    newPrefix: "20240901000005",
  },
  {
    file: "20241218111402-add-column-to-Users.js",
    newPrefix: "20240901000006",
  },
  {
    file: "20250209050404-remove_vat_role_from_users.js",
    newPrefix: "20240901000007",
  },

  // Service-related tables
  { file: "20250209070331-create-service.js", newPrefix: "20240901000008" },
  {
    file: "20250330074722-create-service-provider.js",
    newPrefix: "20240901000009",
  },

  // Order-related tables
  { file: "20250330074802-create-order.js", newPrefix: "20240901000010" },
  {
    file: "20250330074808-create-order-service.js",
    newPrefix: "20240901000011",
  },
  { file: "20250330200000-modify-orders.js", newPrefix: "20240901000012" },
  {
    file: "20250330200100-modify-order-services.js",
    newPrefix: "20240901000013",
  },
  {
    file: "20250401000000-update-order-service-provider.js",
    newPrefix: "20240901000014",
  },

  // Bid-related tables
  { file: "20250501000000-create-order-bids.js", newPrefix: "20240901000015" },

  // Additional features
  { file: "20240331_create_rejected_orders.js", newPrefix: "20240901000016" },
  { file: "20240402_add_status_to_users.js", newPrefix: "20240901000017" },
  {
    file: "20250403160142-create-complains-table.js",
    newPrefix: "20240901000018",
  },
  {
    file: "20250403190402-add-status-and-timestamps-to-complains.js",
    newPrefix: "20240901000019",
  },
  {
    file: "20250403190403-allow-null-userid-in-complains.js",
    newPrefix: "20240901000020",
  },
];

const migrationsDir = path.join(__dirname, "migrations");

// Create a backup directory
const backupDir = path.join(__dirname, "migrations_backup");
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir);
}

// Backup and rename migration files
function fixMigrations() {
  console.log("Backing up original migration files...");

  // First backup all files
  migrationOrder.forEach((migration) => {
    const originalPath = path.join(migrationsDir, migration.file);
    const backupPath = path.join(backupDir, migration.file);

    if (fs.existsSync(originalPath)) {
      fs.copyFileSync(originalPath, backupPath);
      console.log(`Backed up: ${migration.file}`);
    } else {
      console.warn(`Warning: Migration file not found: ${migration.file}`);
    }
  });

  console.log("\nRenaming migration files for proper ordering...");

  // Then rename files with new prefixes
  migrationOrder.forEach((migration) => {
    const originalPath = path.join(migrationsDir, migration.file);

    if (fs.existsSync(originalPath)) {
      // Extract the suffix (everything after the timestamp/prefix)
      const suffix = migration.file.substring(migration.file.indexOf("-") + 1);
      const newFilename = `${migration.newPrefix}-${suffix}`;
      const newPath = path.join(migrationsDir, newFilename);

      // Rename the file
      fs.renameSync(originalPath, newPath);
      console.log(`Renamed: ${migration.file} -> ${newFilename}`);
    }
  });

  console.log("\nMigration files have been reordered successfully!");
  console.log(
    'You can now run "npx sequelize-cli db:migrate" to run migrations in the correct order.'
  );
  console.log(
    "If you need to restore the original files, copy them back from the migrations_backup directory."
  );
}

fixMigrations();
