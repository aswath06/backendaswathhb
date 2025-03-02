const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables
dotenv.config({ path: path.join(__dirname, "config", "config.env") });

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Import routes
const vehicleRoutes = require("./routes/vehicles");
const userRoutes = require("./routes/users");

// Use routes
app.use("/api/v1", vehicleRoutes);
app.use("/api/v1", userRoutes);

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} in ${process.env.NODE_ENV || "development"} mode`);
});
