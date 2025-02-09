const serviceProviderOnly = (req, res, next) => {
  try {
    console.log(req.user);

    const isServiceProvider = req.user.roleId == 2;

    if (!isServiceProvider) {
      return res
        .status(403)
        .json({
          message: "Access denied. Only service providers can add services.",
        });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { serviceProviderOnly };
