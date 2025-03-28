const express = require("express");
const router = express.Router();
const serviceRequestController = require("../controllers/serviceRequestController");
const { authenticate } = require("../middlewares/authenticate");
const { serviceProviderOnly } = require("../middlewares/serviceProviderOnly");

// Create customerOnly middleware inline
const customerOnly = (req, res, next) => {
  try {
    // Check if user has customer role (roleId 1)
    const isCustomer = req.user.roleId == 1;

    if (!isCustomer) {
      return res.status(403).json({
        message: "Access denied. Only customers can create service requests.",
      });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Create a new service request
router.post(
  "/",
  authenticate,
  customerOnly,
  serviceRequestController.createServiceRequest
);

// Get all service requests for a customer (optionally specify customerId, defaults to current user)
router.get(
  "/customer/:customerId?",
  authenticate,
  serviceRequestController.getCustomerServiceRequests
);

// Get all available service requests for a service provider
router.get(
  "/provider/available",
  authenticate,
  serviceProviderOnly,
  serviceRequestController.getServiceProviderRequests
);

// Get a specific service request
router.get(
  "/:requestId",
  authenticate,
  serviceRequestController.getServiceRequestById
);

// Update service request status
router.patch(
  "/:requestId/status",
  authenticate,
  serviceRequestController.updateServiceRequestStatus
);

module.exports = router;
