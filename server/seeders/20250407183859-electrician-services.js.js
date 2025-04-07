"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Services", [
      {
        name: "Computer Repair",
        description:
          "Repair and maintenance services for computers and electronics.",
        price: 300.0,
        total_orders: 0,
        total_providers: 0,
        category: "electrician",
        image: "uploads/ElectricianService/ComputerRepair.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Electrician Maintenance",
        description:
          "Routine electrician maintenance services for homes and offices.",
        price: 180.0,
        total_orders: 0,
        total_providers: 0,
        category: "electrician",
        image: "uploads/ElectricianService/ElectricianMaintenance.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Electrician Service",
        description:
          "General electrician services for wiring, repair, and installation.",
        price: 220.0,
        total_orders: 0,
        total_providers: 0,
        category: "electrician",
        image: "uploads/ElectricianService/ElectricianService.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Fan Repair",
        description: "Expert repair services for ceiling and pedestal fans.",
        price: 90.0,
        total_orders: 0,
        total_providers: 0,
        category: "electrician",
        image: "uploads/ElectricianService/FanRepair.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Industrial Maintenance",
        description:
          "Electric repair and maintenance services for industrial equipment.",
        price: 500.0,
        total_orders: 0,
        total_providers: 0,
        category: "electrician",
        image: "uploads/ElectricianService/IndustrialMaintenance.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Light Repair",
        description: "Light fixing, LED replacement, and bulb holder services.",
        price: 70.0,
        total_orders: 0,
        total_providers: 0,
        category: "electrician",
        image: "uploads/ElectricianService/LightRepair.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Oven Installation",
        description: "Safe and secure oven installation services.",
        price: 200.0,
        total_orders: 0,
        total_providers: 0,
        category: "electrician",
        image: "uploads/ElectricianService/OvenInstallation.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Power Point Installation",
        description: "Install additional power sockets and switches.",
        price: 100.0,
        total_orders: 0,
        total_providers: 0,
        category: "electrician",
        image: "uploads/ElectricianService/PowerPointInstallation.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Solar Panel Installation",
        description:
          "Installation of solar panel systems for homes and businesses.",
        price: 1500.0,
        total_orders: 0,
        total_providers: 0,
        category: "electrician",
        image: "uploads/ElectricianService/SolarPanelInstallation.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Wire Repair",
        description: "Electrical wire inspection and repair services.",
        price: 120.0,
        total_orders: 0,
        total_providers: 0,
        category: "electrician",
        image: "uploads/ElectricianService/WireRepair.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(
      "Services",
      { category: "electrician" },
      {}
    );
  },
};
