const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");

dotenv.config({ path: path.join(__dirname, "config", "config.env") });

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

const vehicleRoutes = require("./routes/vehicles");
const userRoutes = require("./routes/users");

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/vehicles", vehicleRoutes);

app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
