const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");

// Load environment variables
dotenv.config({ path: path.join(__dirname, "config", "config.env") });

const app = express();

// Middleware
app.use(express.json()); // ✅ Required for parsing JSON body
app.use(cors());
app.use(morgan("dev"));

// Import routes
const vehicleRoutes = require("./routes/vehicles");
const userRoutes = require("./routes/users");

// ✅ Use routes correctly
app.use("/api/v1", vehicleRoutes);
app.use("/api/v1", userRoutes);

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
