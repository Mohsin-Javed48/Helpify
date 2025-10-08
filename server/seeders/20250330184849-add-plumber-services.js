"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Services", [
      {
        name: "Bathtub and Shower Installation",
        description:
          "Professional installation services for bathtubs and showers.",
        price: 300.0,
        total_orders: 0,
        total_providers: 0,
        category: "plumber",
        image: "uploads/PlumberServices/Bathtub_and_Shower_Installation.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Bidet Installation and Repair",
        description: "Expert installation and repair of bidet systems.",
        price: 150.0,
        total_orders: 0,
        total_providers: 0,
        category: "plumber",
        image: "uploads/PlumberServices/Bidet_Istallation_and_Repair.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Drain Cleaning and Unclogging",
        description:
          "Fast and efficient drain cleaning and unclogging services.",
        price: 100.0,
        total_orders: 0,
        total_providers: 0,
        category: "plumber",
        image: "uploads/PlumberServices/Drain_Cleaning_and_Unclogging.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Faucet Repair and Replacement",
        description: "Repair or replace leaking or broken faucets.",
        price: 80.0,
        total_orders: 0,
        total_providers: 0,
        category: "plumber",
        image: "uploads/PlumberServices/Faucet_Repair_and_Replacement.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Gas Line Installation and Repair",
        description: "Safe gas line installation and repair by professionals.",
        price: 250.0,
        total_orders: 0,
        total_providers: 0,
        category: "plumber",
        image: "uploads/PlumberServices/Gas_Line_Installation_and_Repair.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Leak Detection and Repair",
        description: "Accurate leak detection and quick repair services.",
        price: 120.0,
        total_orders: 0,
        total_providers: 0,
        category: "plumber",
        image: "uploads/PlumberServices/Leak_Detection_and_Repair.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Septic Tank Installation and Maintenance",
        description: "Complete installation and maintenance of septic tanks.",
        price: 400.0,
        total_orders: 0,
        total_providers: 0,
        category: "plumber",
        image:
          "uploads/PlumberServices/Septic_Tank_Installation_and_Maintenance.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Sink Installation and Repair",
        description: "Installation and repair of kitchen or bathroom sinks.",
        price: 90.0,
        total_orders: 0,
        total_providers: 0,
        category: "plumber",
        image: "uploads/PlumberServices/Sink_Installation_and_Repair.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Toilet Repair and Installation",
        description: "Professional toilet installation and repair services.",
        price: 110.0,
        total_orders: 0,
        total_providers: 0,
        category: "plumber",
        image: "uploads/PlumberServices/Toilet_Repair_and_Installation.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Water Filtration System Installation",
        description:
          "Installation of advanced water filtration systems for your home.",
        price: 220.0,
        total_orders: 0,
        total_providers: 0,
        category: "plumber",
        image:
          "uploads/PlumberServices/Water_Filtration_System_Installation.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Services", { category: "plumber" }, {});
  },
};
