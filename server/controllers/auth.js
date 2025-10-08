const { User } = require("../models");
const { generateHash, compare } = require("../helper/hash");
const { generateToken, verifyToken } = require("../helper/jwt");
const { resetPasswordEmail } = require("../email/resetPassword");
const { otpEmail } = require("../email/otpEmail");
const { sendMail } = require("../helper/mail");

const signUp = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    console.log(firstName, lastName, email, password);

    if (!firstName || !lastName || !email || !password) {
      const error = new Error();
      error.message = "All fields are required";
      error.status = 400;
      throw error;
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      const error = new Error();
      error.message = "User with this email already exists";
      error.status = 400;
      throw error;
    }

    // generate OTP; don't store user yet – return a signed registration token
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    const hashedPassword = await generateHash(password);

    // encode pending registration data in JWT, valid for 10 minutes
    const registrationToken = generateToken(
      { firstName, lastName, email, password: hashedPassword, roleId: 3, otp },
      "10m"
    );

    await sendMail({
      to: email,
      subject: "Verify your Helpify account",
      html: otpEmail(firstName, otp),
    });

    res
      .status(201)
      .json({ message: "OTP sent to your email", registrationToken });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// Verify email OTP and activate account
const verifyEmailOtp = async (req, res, next) => {
  try {
    const { email, otp, registrationToken } = req.body;

    const tokenData = await verifyToken(registrationToken);

    if (
      !tokenData ||
      tokenData.email !== email ||
      String(tokenData.otp) !== String(otp)
    ) {
      return res.status(400).json({ message: "Invalid or mismatched OTP" });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    // Create user now that email is verified
    const createdUser = await User.create({
      firstName: tokenData.firstName,
      lastName: tokenData.lastName,
      email: tokenData.email,
      password: tokenData.password,
      roleId: tokenData.roleId || 3,
      status: "active",
    });

    // Auto-login: generate auth tokens and return user info
    const token = generateToken(createdUser.toJSON());
    const refreshToken = generateToken(createdUser.toJSON(), "1yr");

    return res.status(200).json({
      message: "Email verified successfully",
      user: {
        firstName: createdUser.firstName,
        lastName: createdUser.lastName,
        email: createdUser.email,
        roleId: createdUser.roleId,
        status: createdUser.status,
      },
      token: { token, refreshToken },
    });
  } catch (error) {
    return next(error);
  }
};

const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }

    // Check if user is suspended
    if (user.status === "suspended") {
      const error = new Error(
        "Your account has been suspended due to some issue. Please contact support for assistance."
      );
      error.status = 403;
      throw error;
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      const error = new Error("Invalid password");
      error.status = 400;
      throw error;
    }

    const token = generateToken(user.toJSON());
    const refreshToken = generateToken(user.toJSON(), "1yr");

    res.status(200).json({
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        roleId: user.roleId,
        status: user.status, // Include status in response
      },
      message: "Login successful",
      token: { token, refreshToken },
    });
  } catch (error) {
    console.error("Error during login:", error);
    next(error);
  }
};

const me = (req, res, next) => {
  try {
    if (!req.user) {
      const error = new Error("User not authenticated");
      error.status = 401;
      throw error;
    }

    const AboutUser = {
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
      roleId: req.user.roleId,
    };
    res.status(200).json({ message: "this is me", user: AboutUser });
  } catch (error) {
    next(error);
  }
};

const getRefreshToken = async (req, res, next) => {
  try {
    // Check for refresh token in various places
    const refreshToken =
      req.body.refreshToken ||
      req.headers.refreshtoken ||
      req.cookies?.refreshToken ||
      (req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[1]
        : null);

    if (!refreshToken) {
      const error = new Error("Refresh token is required");
      error.status = 400;
      throw error;
    }

    console.log("Refresh token received:", refreshToken);
    const tokenData = await verifyToken(refreshToken);
    console.log("Token data:", tokenData);

    const user = await User.findByPk(tokenData.id);

    if (!user) {
      const error = new Error("Invalid refresh token or user not found");
      error.status = 400;
      throw error;
    }

    // Use the imported generateToken function
    const newToken = generateToken(user.toJSON());
    const newRefreshToken = generateToken(user.toJSON(), "1yr");

    return res.status(200).json({
      token: newToken,
      refreshToken: newRefreshToken,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        roleId: user.roleId,
      },
    });
  } catch (err) {
    console.error("Error refreshing token:", err);
    if (err.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Refresh token has expired. Please login again." });
    }
    return next(err);
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const email = req.body?.email;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // generate OTP for password reset
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    user.emailOtp = otp;
    user.emailOtpExpiresAt = expiresAt;
    await user.save();

    await sendMail({
      to: email,
      subject: "Your Helpify password reset code",
      html: otpEmail(user.firstName, otp),
    });

    return res.status(200).send({ message: "OTP sent to your email" });
  } catch (error) {
    return next(error);
  }
};

// Reset password using OTP
const setPasswordWithOtp = async (req, res, next) => {
  try {
    const { email, otp, newPassword } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.emailOtp || !user.emailOtpExpiresAt) {
      return res.status(400).json({ message: "No OTP pending" });
    }
    if (new Date(user.emailOtpExpiresAt).getTime() < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }
    if (String(user.emailOtp) !== String(otp)) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    const pass = await generateHash(newPassword);
    user.password = pass;
    user.emailOtp = null;
    user.emailOtpExpiresAt = null;
    await user.save();

    return res.status(200).send({ message: "Password reset successfully" });
  } catch (error) {
    return next(error);
  }
};

// Resend registration OTP using the previous short-lived registration token
const resendRegistrationOtp = async (req, res, next) => {
  try {
    const { registrationToken } = req.body;
    const data = await verifyToken(registrationToken);
    if (!data || !data.email) {
      return res.status(400).json({ message: "Invalid token" });
    }

    // make sure user does not already exist
    const existingUser = await User.findOne({ where: { email: data.email } });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    const newOtp = String(Math.floor(100000 + Math.random() * 900000));
    const newToken = generateToken(
      {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        roleId: data.roleId || 3,
        otp: newOtp,
      },
      "10m"
    );

    await sendMail({
      to: data.email,
      subject: "Your Helpify verification code",
      html: otpEmail(data.firstName, newOtp),
    });

    return res
      .status(200)
      .json({ message: "OTP resent", registrationToken: newToken });
  } catch (error) {
    return next(error);
  }
};

const setPassword = async (req, res, next) => {
  try {
    const passwordToken = req.body.token;

    const newPassword = req.body?.newPassword;

    const tokenData = await verifyToken(passwordToken);

    const user = await User.findOne({ where: { email: tokenData.email } });
    console.log(user);
    console.log(passwordToken);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user?.forgetToken !== passwordToken) {
      const error = new Error("invalid_token");
      error.statusCode = 409;
      throw error;
    }
    const pass = await generateHash(newPassword);
    user.password = pass;
    user.forgetToken = null;

    await user.save();

    return res.status(200).send({ message: "Password reset Sucessfully" });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(400).json({ message: "token_expired" });
    }
    return next(error);
  }
};

module.exports = {
  signUp,
  loginController,
  me,
  getRefreshToken,
  forgotPassword,
  setPassword,
  verifyEmailOtp,
  setPasswordWithOtp,
  resendRegistrationOtp,
};
