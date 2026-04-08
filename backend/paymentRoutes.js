const express = require("express");
const router = express.Router();

const {
  createOrder,
  verifyPayment,
} = require("./paymentController");

console.log("Trying to load controller...");
console.log(require("./paymentController"));
router.post("/create-order", createOrder);
router.post("/verify-payment", verifyPayment);

module.exports = router;