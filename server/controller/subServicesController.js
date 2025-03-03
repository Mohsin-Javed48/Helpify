const SubService = require("../models/SubService");

// ✅ Get All Sub-Services
exports.getAllSubServices = async (req, res) => {
  try {
    const subServices = await SubService.find().populate(
      "serviceId",
      "category"
    );
    res.status(200).json(subServices);
  } catch (error) {
    res.status(500).json({ message: "Error fetching sub-services", error });
  }
};

// ✅ Get Sub-Services by Service ID (Find all sub-services under a specific category)
exports.getSubServicesByServiceId = async (req, res) => {
  try {
    const subServices = await SubService.find({
      serviceId: req.params.serviceId,
    });
    res.status(200).json(subServices);
  } catch (error) {
    res.status(500).json({ message: "Error fetching sub-services", error });
  }
};

// ✅ Get Single Sub-Service by ID
exports.getSubServiceById = async (req, res) => {
  try {
    const subService = await SubService.findById(req.params.id).populate(
      "serviceId",
      "category"
    );
    if (!subService)
      return res.status(404).json({ message: "Sub-service not found" });
    res.status(200).json(subService);
  } catch (error) {
    res.status(500).json({ message: "Error fetching sub-service", error });
  }
};

// ✅ Create a New Sub-Service
exports.createSubService = async (req, res) => {
  try {
    const { serviceId, name, price, description } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    if (!imageUrl) {
      return res.status(400).json({ message: "Image is required!" });
    }

    const subService = new SubService({
      serviceId,
      name,
      imageUrl,
      price,
      description,
    });

    await subService.save();
    res
      .status(201)
      .json({ message: "SubService created successfully!", subService });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update an Existing Sub-Service
exports.updateSubService = async (req, res) => {
  try {
    const updatedSubService = await SubService.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedSubService)
      return res.status(404).json({ message: "Sub-service not found" });
    res
      .status(200)
      .json({ message: "Sub-service updated successfully", updatedSubService });
  } catch (error) {
    res.status(500).json({ message: "Error updating sub-service", error });
  }
};

// ✅ Delete a Sub-Service
exports.deleteSubService = async (req, res) => {
  try {
    const deletedSubService = await SubService.findByIdAndDelete(req.params.id);
    if (!deletedSubService)
      return res.status(404).json({ message: "Sub-service not found" });
    res.status(200).json({ message: "Sub-service deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting sub-service", error });
  }
};
