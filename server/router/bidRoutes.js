const express = require("express");
const router = express.Router();
const bidController = require("../controllers/bidController");
const { authenticate } = require("../middlewares/authenticate");
const { serviceProviderOnly } = require("../middlewares/serviceProviderOnly");

// Get all bids for a customer (optionally specify customerId, defaults to current user)
router.get(
  "/customer/:customerId?",
  authenticate,
  bidController.getCustomerBids
);

// Get all bids for a service provider (optionally specify providerId, defaults to current user)
router.get(
  "/provider/:serviceProviderId?",
  authenticate,
  serviceProviderOnly,
  bidController.getServiceProviderBids
);

// Get all bids for a specific service request
router.get("/request/:requestId", authenticate, bidController.getBidsByRequest);

// Get specific bid by ID
router.get("/:bidId", authenticate, bidController.getBidById);

// Create a new bid
router.post("/", authenticate, serviceProviderOnly, bidController.createBid);

// Update bid status (accept/reject)
router.patch("/:bidId/status", authenticate, bidController.updateBidStatus);

// Submit counter offer
router.post(
  "/:bidId/counter-offer",
  authenticate,
  bidController.submitCounterOffer
);

module.exports = router;
