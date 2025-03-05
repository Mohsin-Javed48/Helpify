const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userModel = require("./models/userModel");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // 10s timeout
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1); // Exit on failure
  }
};
connectDB();

app.post("/auth/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // 🔹 Store password as a simple string (No hashing)
    const newUser = await userModel.create({
      firstName,
      lastName,
      email,
      password,
    });

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("auth/forget", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });
    console.log(user);
    const resetToken = generateToken(user);
    user.resetToken = resetToken;
    user.resetTokenExpire = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    await sendEmail(
      user.email,
      "Password Reset",
      `Click here to reset your password: ${resetUrl}`
    );

    res.json({ msg: "Password reset link sent" });
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
});

app.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("🔍 Searching for User:", email);

    // Find user by email
    const user = await userModel.findOne({ email });

    console.log("📂 User Found in Database:", user);

    if (!user) {
      console.log("❌ User Not Found");
      return res.status(404).json({ error: "User not found" });
    }

    // 🔹 Compare passwords directly (No hashing)
    if (password !== user.password) {
      console.log("❌ Incorrect Password");
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate JWT Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log("✅ Login Successful:", token);

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("❌ Server Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.get("/", function (req, res) {
  res.send("Hello World!");
});

module.exports = app; // ✅ Correct CommonJS export
