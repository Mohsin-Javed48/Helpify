"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Services", [
      {
        name: "Cabinet Repair and Installation",
        description:
          "Repair or install cabinets in kitchens, bathrooms, and more.",
        price: 180.0,
        total_orders: 0,
        total_providers: 0,
        category: "handyman",
        image: "uploads/HandymanServices/Cabinet_Repair_and_Installation.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Door Lock Repair",
        description: "Fix or replace damaged or faulty door locks.",
        price: 90.0,
        total_orders: 0,
        total_providers: 0,
        category: "handyman",
        image: "uploads/HandymanServices/Door_Lock_Repair.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Floor Cleaning",
        description: "Deep cleaning of tile, marble, and wooden floors.",
        price: 130.0,
        total_orders: 0,
        total_providers: 0,
        category: "handyman",
        image: "uploads/HandymanServices/Floor_Cleaning.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Flooring Installation",
        description:
          "Install all types of flooring including vinyl, laminate, and tile.",
        price: 400.0,
        total_orders: 0,
        total_providers: 0,
        category: "handyman",
        image: "uploads/HandymanServices/Flooring_Installation.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Furniture Assembly",
        description: "Assemble new or used furniture pieces efficiently.",
        price: 100.0,
        total_orders: 0,
        total_providers: 0,
        category: "handyman",
        image: "uploads/HandymanServices/Furniture_Assembly.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Painting and Wall Patching",
        description:
          "Wall painting and small patch repairs for a clean finish.",
        price: 250.0,
        total_orders: 0,
        total_providers: 0,
        category: "handyman",
        image: "uploads/HandymanServices/Painting_and_wall_patching.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Pet Door Installation",
        description:
          "Install pet doors safely and securely into existing doors or walls.",
        price: 120.0,
        total_orders: 0,
        total_providers: 0,
        category: "handyman",
        image: "uploads/HandymanServices/Pet_Door_Installation.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Pressure Washing",
        description:
          "High-pressure outdoor cleaning services for driveways, patios, and more.",
        price: 160.0,
        total_orders: 0,
        total_providers: 0,
        category: "handyman",
        image: "uploads/HandymanServices/Pressure_Washing.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Tile and Grout Repair",
        description:
          "Restore and regrout broken or worn tiles in bathrooms and kitchens.",
        price: 210.0,
        total_orders: 0,
        total_providers: 0,
        category: "handyman",
        image: "uploads/HandymanServices/Tile_and_Grout_Repair.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Window Repair",
        description:
          "Fix broken frames, glass, or tracks on all types of windows.",
        price: 140.0,
        total_orders: 0,
        total_providers: 0,
        category: "handyman",
        image: "uploads/HandymanServices/Window_Repair.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Services", { category: "handyman" }, {});
  },
};
