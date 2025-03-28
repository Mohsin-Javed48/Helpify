const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");
const { authenticate } = require("../middlewares/authenticate");

// Get all notifications for the current user
router.get("/", authenticate, notificationController.getUserNotifications);

// Get notification count
router.get("/count", authenticate, notificationController.getNotificationCount);

// Mark notification as read
router.patch(
  "/:notificationId/read",
  authenticate,
  notificationController.markAsRead
);

// Mark all notifications as read
router.patch(
  "/mark-all-read",
  authenticate,
  notificationController.markAllAsRead
);

// Delete a notification
router.delete(
  "/:notificationId",
  authenticate,
  notificationController.deleteNotification
);

module.exports = router;
