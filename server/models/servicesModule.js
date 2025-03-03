const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: true,
  }, // References the parent service category
  name: { type: String, required: true }, // Sub-service name (e.g., "Sink Fixing")
  description: { type: String }, // Optional description
  price: { type: Number, required: true }, // Base price for the sub-service
  duration: { type: String }, // Estimated time required (e.g., "30 minutes")
  imageUrl: { type: String, required: true }, // Image URL for the sub-service
  timesBooked: { type: Number, default: 0 }, // Tracks how many times the service has been booked
  createdAt: { type: Date, default: Date.now }, // Timestamp
});

const Service = mongoose.model("SubService", serviceSchema);
module.exports = Service;
