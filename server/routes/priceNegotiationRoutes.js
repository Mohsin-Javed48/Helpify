const express = require("express");
const router = express.Router();
const priceNegotiationController = require("../controllers/priceNegotiationController");
const { authenticate } = require("../middlewares/authenticate");

// Create a new price negotiation
router.post("/", authenticate, priceNegotiationController.createNegotiation);

// Get all negotiations for a bid
router.get(
  "/bid/:bidId",
  authenticate,
  priceNegotiationController.getNegotiations
);

// Update negotiation status (accept/reject)
router.patch(
  "/:negotiationId/status",
  authenticate,
  priceNegotiationController.updateNegotiationStatus
);

module.exports = router;
