const express = require("express");
const { sequelize } = require("./models");
const router = require("./router/index");
const cors = require("cors");
const logger = require("morgan");
const path = require("path");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(logger("dev"));

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
///comem
app.use("/api/v1", router);
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
sequelize
  .authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: " + err));

app.use((error, _req, res, _next) => {
  const statusCode = error.status || 500;
  const message = error.message || "Something went wrong";

  console.error(error); // Log the error details for debugging

  // Send the error response
  res.status(statusCode).json({
    message: message,
  });
});

const server = app
  .listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })
  .on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.log("Port is busy, trying to close previous connection...");
      require("child_process").exec(`npx kill-port ${PORT}`, (err) => {
        if (!err) {
          console.log(`Port ${PORT} was freed`);
          server.listen(PORT);
        }
      });
    }
  });

module.exports = app;
