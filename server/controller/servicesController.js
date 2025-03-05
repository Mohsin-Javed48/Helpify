const Service = require("../models/Service");

// ✅ Get All Services
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: "Error fetching services", error });
  }
};

// ✅ Get Single Service by ID
exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: "Error fetching service", error });
  }
};

// ✅ Create a New Service
exports.createService = async (req, res) => {
  try {
    const newService = new Service(req.body);
    await newService.save();
    res
      .status(201)
      .json({ message: "Service created successfully", newService });
  } catch (error) {
    res.status(500).json({ message: "Error creating service", error });
  }
};

// ✅ Update an Existing Service
exports.updateService = async (req, res) => {
  try {
    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedService)
      return res.status(404).json({ message: "Service not found" });
    res
      .status(200)
      .json({ message: "Service updated successfully", updatedService });
  } catch (error) {
    res.status(500).json({ message: "Error updating service", error });
  }
};

// ✅ Delete a Service
exports.deleteService = async (req, res) => {
  try {
    const deletedService = await Service.findByIdAndDelete(req.params.id);
    if (!deletedService)
      return res.status(404).json({ message: "Service not found" });
    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting service", error });
  }
};
