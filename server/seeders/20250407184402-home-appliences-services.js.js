"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Services", [
      {
        name: "Air Conditioner Installation",
        description: "Professional installation of window and split AC units.",
        price: 500.0,
        total_orders: 0,
        total_providers: 0,
        category: "home_appliances",
        image:
          "uploads/HomeAppliancesServices/Air_Conditioner_Installation.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Ceiling Fan Installation",
        description: "Safe and secure ceiling fan installation services.",
        price: 120.0,
        total_orders: 0,
        total_providers: 0,
        category: "home_appliances",
        image:
          "uploads/HomeAppliancesServices/Ceiling_Fan_Installation_and_Repair.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Dishwasher Repair",
        description: "Expert repair services for all dishwasher brands.",
        price: 300.0,
        total_orders: 0,
        total_providers: 0,
        category: "home_appliances",
        image: "uploads/HomeAppliancesServices/Dishwasher_Repair.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Electric Stove Installation",
        description: "Professional installation of electric stoves.",
        price: 250.0,
        total_orders: 0,
        total_providers: 0,
        category: "home_appliances",
        image:
          "uploads/HomeAppliancesServices/Electric_Stove_Installation.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Microwave Oven Repair",
        description: "Repair services for microwave ovens.",
        price: 180.0,
        total_orders: 0,
        total_providers: 0,
        category: "home_appliances",
        image: "uploads/HomeAppliancesServices/Microwave_Oven_Repair.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Refrigerator Repair",
        description: "Comprehensive repair services for refrigerators.",
        price: 350.0,
        total_orders: 0,
        total_providers: 0,
        category: "home_appliances",
        image: "uploads/HomeAppliancesServices/Refrigerator_Repair.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Smart TV Installation",
        description: "Professional mounting and setup of smart TVs.",
        price: 280.0,
        total_orders: 0,
        total_providers: 0,
        category: "home_appliances",
        image:
          "uploads/HomeAppliancesServices/Smart_TV_Installation_and_Repair.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Vacuum Cleaner Repair",
        description: "Repair services for all vacuum cleaner brands.",
        price: 150.0,
        total_orders: 0,
        total_providers: 0,
        category: "home_appliances",
        image: "uploads/HomeAppliancesServices/Vacuum_Cleaner_Repair.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Washing Machine Repair",
        description: "Expert repair services for washing machines.",
        price: 320.0,
        total_orders: 0,
        total_providers: 0,
        category: "home_appliances",
        image: "uploads/HomeAppliancesServices/Washing_Machine_Repair.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Water Heater Installation",
        description: "Professional installation of water heaters.",
        price: 270.0,
        total_orders: 0,
        total_providers: 0,
        category: "home_appliances",
        image: "uploads/HomeAppliancesServices/Water_Heater_Installation.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(
      "Services",
      { category: "home_appliances" },
      {}
    );
  },
};
