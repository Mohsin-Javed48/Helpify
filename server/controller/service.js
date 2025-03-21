const multer = require("multer");
const path = require("path");
const { Service } = require("../models");

// 📌 Service creation function
const createService = async (req, res) => {
  console.log("hello");
  try {
    const {
      name,
      description,
      price,
      category,
      total_orders,
      total_providers,
    } = req.body;
    console.log(req.body);

    console.log(req.body);
    if (!name || !price || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 📌 Save the uploaded image path if available
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    // 📌 Create new service with image and category
    const newService = await Service.create({
      name,
      description,
      price,
      category,
      image: imagePath, // Save image path in DB
      total_orders,
      total_providers,
    });

    res
      .status(201)
      .json({ message: "Service created successfully", newService });
  } catch (error) {
    console.error("Error creating service:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// 📌 Get services by category
const getServicesByCategory = async (req, res) => {
  try {
    const { category } = req.query;
    let query = {};
    if (category) query.category = category;

    const services = await Service.findAll({ where: query });

    const updatedServices = services.map(service => ({
      ...service.toJSON(),
      image: `${req.protocol}://${req.get("host")}/${service.image}`, // Convert relative path to full URL
    }));

    res.status(200).json(updatedServices);
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports = { createService, getServicesByCategory };
