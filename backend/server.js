const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

require("./db");

// middleware
app.use(express.json());

app.use(cors({
  origin: "https://assignment-74-1.netlify.app",
  credentials: true
}));

// routes
app.use("/api/payment", require("./paymentRoutes"));
app.use("/api/auth", require("./authRoutes"));
app.use("/api/address", require("./addressRoutes"));
app.use("/api/order", require("./orderRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on ${PORT}`)
);