const express = require("express");
const { sequelize } = require("./models");
const router = require("./router/index");
const cors = require("cors");
const logger = require("morgan");
const path = require("path");
const http = require("http");
const { initializeSocket } = require("./services/socketService");
const priceNegotiationRoutes = require("./routes/priceNegotiationRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));

// CORS configuration
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/v1", router);
app.use("/api/v1/price-negotiation", priceNegotiationRoutes);
app.use("/api/v1/notifications", notificationRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: err.message,
  });
});

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
initializeSocket(server);

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);

  // Database connection
  sequelize
    .authenticate()
    .then(() => {
      console.log("Database connection established successfully.");
    })
    .catch((err) => {
      console.error("Unable to connect to the database:", err);
    });
});

module.exports = app;
