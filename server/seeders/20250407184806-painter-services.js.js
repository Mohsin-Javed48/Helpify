"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Services", [
      {
        name: "Ceiling Painting",
        description:
          "Enhance your interiors with smooth ceiling paint finishes.",
        price: 220.0,
        total_orders: 0,
        total_providers: 0,
        category: "painter",
        image: "uploads/PainterServices/Ceiling_Painting.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Concrete Floor Painting",
        description:
          "Protect and decorate concrete floors with high-durability paint.",
        price: 300.0,
        total_orders: 0,
        total_providers: 0,
        category: "painter",
        image: "uploads/PainterServices/Concrete_Floor_Painting.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Exterior House Painting",
        description:
          "Professional exterior painting using weather-resistant materials.",
        price: 500.0,
        total_orders: 0,
        total_providers: 0,
        category: "painter",
        image: "uploads/PainterServices/Exterior_House_Painting.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Interior Wall Painting",
        description: "Premium interior wall painting for a fresh look.",
        price: 400.0,
        total_orders: 0,
        total_providers: 0,
        category: "painter",
        image: "uploads/PainterServices/Interior_Wall_Painting.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Murals and Artistic Wall Painting",
        description:
          "Custom wall murals and artistic expressions for unique interiors.",
        price: 750.0,
        total_orders: 0,
        total_providers: 0,
        category: "painter",
        image: "uploads/PainterServices/Murals_and_Artistic_Wall_Painting.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Playground Equipment Painting",
        description:
          "Bright and durable painting services for outdoor play structures.",
        price: 350.0,
        total_orders: 0,
        total_providers: 0,
        category: "painter",
        image: "uploads/PainterServices/Playground_Equipment_Painting.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Roof Painting",
        description:
          "Roof coating and painting to improve durability and aesthetics.",
        price: 600.0,
        total_orders: 0,
        total_providers: 0,
        category: "painter",
        image: "uploads/PainterServices/Roof_Painting.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Wallpaper Removal and Repainting",
        description: "Removal of old wallpaper and fresh repainting services.",
        price: 280.0,
        total_orders: 0,
        total_providers: 0,
        category: "painter",
        image: "uploads/PainterServices/Wallpaper_Removal_and_Repainting.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Window Shutter Painting",
        description:
          "Painting and refinishing of indoor and outdoor window shutters.",
        price: 180.0,
        total_orders: 0,
        total_providers: 0,
        category: "painter",
        image: "uploads/PainterServices/Window_Shutter_Painting.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Wood Staining and Varnishing",
        description:
          "Protect and beautify wood surfaces with professional staining and varnish.",
        price: 320.0,
        total_orders: 0,
        total_providers: 0,
        category: "painter",
        image: "uploads/PainterServices/Wood_Staining_and_Varnishing.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Services", { category: "painter" }, {});
  },
};
