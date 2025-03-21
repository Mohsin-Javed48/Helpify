const express = require("express");
const router = express.Router();
const {
  
  getServicesByCategory,
} = require("../controller/service");

// 📌 Use multer middleware to handle file uploads
router.get("/", getServicesByCategory);

module.exports = router;
