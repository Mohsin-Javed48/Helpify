const { Admin, User } = require("../models");

// Get all admins with their user details
exports.getAllAdmins = async (req, res) => {
  try {
    console.log("getAllAdmins");
    // Find users with roleId = 1 (admin role)
    const admins = await User.findAll({
      where: {
        roleId: 1,
      },
    });

    console.log(admins);
    return res.status(200).json({
      success: true,
      data: admins,
    });
  } catch (error) {
    console.error("Error fetching admins:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get a specific admin with user details
exports.getAdminById = async (req, res) => {
  try {
    const { id } = req.params;

    const admin = await User.findOne({
      where: {
        id: id,
        roleId: 1,
      },
    });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: admin,
    });
  } catch (error) {
    console.error("Error fetching admin:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Create a new admin (requires an existing user)
exports.createAdmin = async (req, res) => {
  try {
    const { userId, role } = req.body;

    // Check if user exists and is an admin type (roleId = 1)
    const user = await User.findOne({
      where: {
        id: userId,
        roleId: 1, // Make sure user has admin role
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found or is not an admin role",
      });
    }

    // Check if admin already exists for this user
    const existingAdmin = await Admin.findOne({
      where: { userId },
    });

    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "Admin already exists for this user",
      });
    }

    const admin = await Admin.create({
      userId,
      role: role || "admin",
      status: "active",
    });

    // Fetch the created admin with user details
    const newAdmin = await Admin.findByPk(admin.id, {
      include: [
        {
          model: User,
          attributes: [
            "id",
            "firstName",
            "lastName",
            "email",
            "contact",
            "image",
          ],
        },
      ],
    });

    return res.status(201).json({
      success: true,
      data: newAdmin,
    });
  } catch (error) {
    console.error("Error creating admin:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Login for admin (using user credentials)
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user with admin role
    const user = await User.findOne({
      where: {
        email,
        roleId: 1, // Admin role
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Admin not found with this email",
      });
    }

    // Check password (you would use bcrypt to compare passwords)
    // This is a simplified example - in production use proper authentication
    if (user.password !== password) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Update last login time (if you want to track this)
    await user.update({ updatedAt: new Date() });

    return res.status(200).json({
      success: true,
      message: "Admin logged in successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error logging in admin:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
