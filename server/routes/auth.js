const router = require("express").Router();

const { authenticate } = require("../middlewares/authenticate");

const {
  signUp,
  loginController,
  me,
  getRefreshToken,
  forgotPassword,
  setPassword,
  verifyEmailOtp,
  setPasswordWithOtp,
  resendRegistrationOtp,
} = require("../controllers/auth");

router.post("/register", signUp);
router.post("/login", loginController);
router.post("/verify-email-otp", verifyEmailOtp);
router.post("/forgot", forgotPassword);
router.post("/reset-with-otp", setPasswordWithOtp);
router.post("/resend-registration-otp", resendRegistrationOtp);
router.get("/me", authenticate, me);
router.post("/refresh-token", getRefreshToken);
router.post("/forget-password", forgotPassword);
router.post("/reset-password", setPassword);

module.exports = router;
