const express = require("express");
const router = express.Router();
const orderController = require("../controller/orderController");
const {
  authenticateUser,
  authorizeRoles,
} = require("../middlewares/authenticate");

// Debug logs to check if controller functions are defined
console.log("orderController:", orderController);
console.log(
  "createOrder function exists:",
  typeof orderController.createOrder === "function"
);
console.log(
  "getOrders function exists:",
  typeof orderController.getOrders === "function"
);
console.log(
  "getOrderById function exists:",
  typeof orderController.getOrderById === "function"
);

// Public routes - none

// Protected routes - using anonymous function wrappers
router.post("/", authenticateUser, (req, res) =>
  orderController.createOrder(req, res)
);
router.get("/", authenticateUser, (req, res) =>
  orderController.getOrders(req, res)
);
router.get("/:id", authenticateUser, (req, res) =>
  orderController.getOrderById(req, res)
);
router.patch("/:id/status", authenticateUser, (req, res) =>
  orderController.updateOrderStatus(req, res)
);
router.patch("/:id/review", authenticateUser, (req, res) =>
  orderController.addReview(req, res)
);

module.exports = router;
