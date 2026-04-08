const Razorpay = require("razorpay");
const crypto = require("crypto");

const razorpay = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});


// ✅ Create Order

exports.createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    console.log("CREATED ORDER:", order);

    res.json(order);
  } catch (error) {
     console.error("RAZORPAY ERROR:", error);
    res.status(500).json({ error: "Order creation failed" });
  }
};

// ✅ Verify Payment

exports.verifyPayment = (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.KEY_SECRET)
    .update(body)
    .digest("hex");


  if (expectedSignature === razorpay_signature) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }

  
console.log("REQ BODY:", req.body);
console.log("EXPECTED:", expectedSignature);
console.log("RECEIVED:", razorpay_signature);

};