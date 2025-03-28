const socketIo = require("socket.io");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

// Store connected users and service providers
const connections = {
  users: {}, // userId -> socket
  serviceProviders: {}, // serviceProviderId -> socket
};

const initializeSocket = (server) => {
  const io = socketIo(server, {
    cors: {
      origin: ["http://localhost:5173", "http://localhost:3000"],
      methods: ["GET", "POST"],
      credentials: true,
      allowedHeaders: ["Authorization"],
    },
    transports: ['websocket', 'polling'],
  });

  // Authentication middleware
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      if (!token) {
        return next(new Error("Authentication error: Token missing"));
      }

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_jwt_secret");
      
      // Get user from database
      const user = await User.findByPk(decoded.id);
      if (!user) {
        return next(new Error("User not found"));
      }

      // Store user info in socket
      socket.userId = user.id;
      socket.userRole = user.roleId;
      socket.user = user;

      next();
    } catch (error) {
      console.error("Socket authentication error:", error);
      next(new Error("Authentication error: " + error.message));
    }
  });

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.userId}, role: ${socket.userRole}`);

    // Store the connection based on user role
    if (socket.userRole === 3) { // Customer
      connections.users[socket.userId] = socket;
      socket.join(`user-${socket.userId}`);
    } else if (socket.userRole === 2) { // Service Provider
      connections.serviceProviders[socket.userId] = socket;
      socket.join(`sp-${socket.userId}`);
    }

    // Handle bid request from customer
    socket.on("request-bid", async (data) => {
      try {
        console.log("Bid request received:", data);

        // Validate the data
        if (!data.services || !data.scheduledDate || !data.scheduledTime) {
          socket.emit("bid-request-error", {
            message: "Invalid bid request data"
          });
          return;
        }

        // Broadcast to service providers
        for (const spId in connections.serviceProviders) {
          connections.serviceProviders[spId].emit("new-bid-request", {
            bidRequestId: data.bidRequestId,
            customerId: socket.userId,
            customerName: socket.user.firstName + " " + socket.user.lastName,
            services: data.services,
            scheduledDate: data.scheduledDate,
            scheduledTime: data.scheduledTime,
            address: data.address,
            totalAmount: data.services.reduce(
              (total, service) => total + service.price * service.quantity,
              0
            ),
          });
        }

        // Confirm to the customer
        socket.emit("bid-request-sent", {
          message: "Your bid request has been sent to service providers",
          bidRequestId: data.bidRequestId,
        });
      } catch (error) {
        console.error("Error processing bid request:", error);
        socket.emit("bid-request-error", {
          message: "Server error processing bid request"
        });
      }
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.userId}`);

      // Remove from connections
      if (socket.userRole === 3) {
        delete connections.users[socket.userId];
      } else if (socket.userRole === 2) {
        delete connections.serviceProviders[socket.userId];
      }
    });
  });

  return io;
};

module.exports = {
  initializeSocket,
  getConnections: () => connections,
};
