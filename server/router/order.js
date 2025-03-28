const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middlewares/authenticate");

// Simple test route to verify router is working
router.get("/test", (req, res) => {
  res.json({ message: "Order router is working!" });
});

// Create order - simplified for testing
router.post("/", (req, res) => {
  try {
    // Just echo back the request for now
    res.status(201).json({
      success: true,
      message: "Order created successfully (test)",
      data: req.body,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in order creation",
      error: error.message,
    });
  }
});

// Get all orders - simplified for testing
router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Orders retrieved successfully (test)",
    orders: [
      {
        id: 1,
        title: "Test Order",
        status: "pending",
        amount: 2500,
      },
    ],
  });
});

// Get order by ID - simplified for testing
router.get("/:id", (req, res) => {
  res.json({
    success: true,
    message: `Order ${req.params.id} retrieved successfully (test)`,
    order: {
      id: req.params.id,
      title: "Test Order",
      status: "pending",
      amount: 2500,
    },
  });
});

module.exports = router;
