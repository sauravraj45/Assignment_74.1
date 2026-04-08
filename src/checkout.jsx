import React, { useState } from "react";

function Checkout({ products, cart, totalPrice, onOrderSuccess }) {
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("online");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handlePayment = async () => {
    try {
      setLoading(true);

      // 1. Create order
      const res = await fetch("http://localhost:5000/api/payment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: totalPrice }),
      });

      const order = await res.json();

      // 2. Razorpay options
      const options = {
        key: "rzp_test_SaCP6pKyOd3bTO", // 🔥 replace
        amount: order.amount,
        currency: "INR",
        name: "Apna Store",
        description: "Order Payment",
        order_id: order.id,

        handler: async function (response) {
          const verifyRes = await fetch(
            "http://localhost:5000/api/payment/verify-payment",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(response),
            }
          );

          const data = await verifyRes.json();

          if (data.success) {
            alert("Payment Successful 🎉");

            onOrderSuccess({
              address,
              paymentMethod,
              products,
              cart,
              totalPrice,
              paymentId: response.razorpay_payment_id,
            });
          } else {
            alert("Payment Failed ❌");
          }
        },

        theme: {
          color: "#ef4444",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error(err);
      alert("Payment error ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleCOD = () => {
    alert("Order placed with Cash on Delivery ✅");

    onOrderSuccess({
      address,
      paymentMethod,
      products,
      cart,
      totalPrice,
      paymentId: null,
    });
  };

  const handlePlaceOrder = () => {
    if (!address.name || !address.phone || !address.address) {
      alert("Please fill all details");
      return;
    }

    if (paymentMethod === "online") {
      handlePayment();
    } else {
      handleCOD();
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-5 grid md:grid-cols-2 gap-8">

      {/* LEFT - ADDRESS */}
      <div className="bg-white p-5 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">Shipping Details</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="w-full border p-2 mb-3"
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          className="w-full border p-2 mb-3"
          onChange={handleChange}
        />

        <textarea
          name="address"
          placeholder="Full Address"
          className="w-full border p-2 mb-3"
          onChange={handleChange}
        />

        {/* Payment Method */}
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Payment Method</h3>

          <label className="block">
            <input
              type="radio"
              value="online"
              checked={paymentMethod === "online"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <span className="ml-2">Online Payment</span>
          </label>

          <label className="block mt-2">
            <input
              type="radio"
              value="cod"
              checked={paymentMethod === "cod"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <span className="ml-2">Cash on Delivery</span>
          </label>
        </div>
      </div>

      {/* RIGHT - SUMMARY */}
      <div className="bg-white p-5 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>

        {products.map((product) => {
          const qty = cart[product.id] || 0;
          if (!qty) return null;

          return (
            <div key={product.id} className="flex justify-between mb-2">
              <span>{product.title} × {qty}</span>
              <span>₹{product.price * qty}</span>
            </div>
          );
        })}

        <hr className="my-3" />

        <h3 className="text-lg font-bold">
          Total: ₹{totalPrice.toFixed(2)}
        </h3>

        <button
          onClick={handlePlaceOrder}
          disabled={loading}
          className="w-full bg-red-500 text-white py-3 mt-5 rounded-lg hover:bg-red-600"
        >
          {loading ? "Processing..." : "Place Order"}
        </button>
      </div>
    </div>
  );
}

export default Checkout;