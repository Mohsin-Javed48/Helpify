// const express = require("express");
// const {
//   register,
//   login,
//   forgotPassword,
// } = require("../controller/authController");
// const { body } = require("express-validator");

// const router = express.Router();

// router.post(
//   "/register",
//   [
//     body("name").notEmpty().withMessage("Name is required"),
//     body("email").isEmail().withMessage("Enter a valid email"),
//     body("password")
//       .isLength({ min: 6 })
//       .withMessage("Password must be at least 6 characters"),
//   ],
//   register
// );

// router.post("/register", login);
// router.post("/forgot-password", forgotPassword);

// module.exports = router;
