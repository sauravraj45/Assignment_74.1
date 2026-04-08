import React, { useState, useEffect } from "react";
import CartRow from "./CartRow";
import BuyNowMessage from "./BuyNowMessage";
import EmptyCart from "./EmptyCart";

function CartList({ products, cart, onCart, onRemove }) {
  const [pendingCart, setPendingCart] = useState({ ...cart });
  const [checkout, setCheckout] = useState(false);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");

  // 🔥 ADDRESS STATES
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddressList, setShowAddressList] = useState(false);

  // 🔥 USER
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  useEffect(() => {
    setPendingCart({ ...cart });
  }, [cart]);

  // 🔥 FETCH ADDRESSES
  useEffect(() => {
    if (!userId) return;

    fetch(`http://localhost:5000/api/address/${userId}`)
      .then(res => res.json())
      .then(data => {
        console.log("Fetched Address:", data);
        setAddresses(data);

        if (data.length > 0) {
          setSelectedAddress(data[0]); // default address
        }
      })
      .catch(err => console.log(err));
  }, [userId]);

  const totalPrice = products.reduce((sum, product) => {
    const quantity = pendingCart[product.id] || 0;
    return sum + product.price * quantity;
  }, 0);

  function handleQuantityChange(id, newQuantity) {
    setPendingCart(prev => ({
      ...prev,
      [id]: newQuantity,
    }));
  }
  
// Orders..
  async function saveOrder(paymentMethod) {
  try {
    const user = JSON.parse(localStorage.getItem("user"));

    const items = products.map(p => ({
      id: p.id,
      title: p.title,
      price: p.price,
      quantity: pendingCart[p.id],
    }));

    await fetch("http://localhost:5000/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user.id,
        items,
        address: selectedAddress,
        total_amount: totalPrice,
        payment_method: paymentMethod,
      }),
    });

  } catch (error) {
    console.log("Order Save Error:", error);
  }
}

  // 🔥 PAYMENT HANDLER
  async function handleProceedToCheckout() {
    try {
      const res = await fetch("http://localhost:5000/api/payment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: totalPrice }),
      });

      const order = await res.json();

      const options = {
        key: "rzp_test_SaCP6pKyOd3bTO",
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
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            }
          );

          const data = await verifyRes.json();

          if (data.success) {
            await saveOrder("COD");
            setCheckout(true);

            setTimeout(() => {
              onCart({});
            }, 100);
          } else {
            alert("Payment Failed ❌");
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      alert("Payment Error ❌");
    }
  }

  function handleBackHome() {
    setCheckout(false);
  }

  // ✅ SUCCESS PAGE
  if (checkout) {
    return <BuyNowMessage onBackHome={handleBackHome} />;
  }

  // ✅ EMPTY CART
  if (products.length === 0) {
    return <EmptyCart />;
  }

  // ✅ PAYMENT SCREEN
  if (showPaymentOptions) {
    return (
      <div className="max-w-xl m-auto bg-white p-6 mt-10 shadow rounded">
        <h2 className="text-xl font-bold mb-4">Select Payment Method</h2>

        <div className="border p-3 mb-3 flex justify-between">
          <p>Cash on Delivery</p>
          <input
            type="radio"
            checked={paymentMethod === "cod"}
            onChange={() => setPaymentMethod("cod")}
          />
        </div>

        <div className="border p-3 mb-3 flex justify-between">
          <p>Online Payment</p>
          <input
            type="radio"
            checked={paymentMethod === "online"}
            onChange={() => setPaymentMethod("online")}
          />
        </div>

        <button
          onClick={ async() => {
            if (paymentMethod === "cod") {
              await saveOrder("ONLINE"); 
              setCheckout(true);
              onCart({});
            } else {
              handleProceedToCheckout();
            }
          }}
          className="w-full bg-yellow-500 py-3 mt-4 rounded"
        >
          Continue
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl m-auto grid md:grid-cols-3 gap-6 mt-6">

      {/* LEFT SIDE */}
      <div className="md:col-span-2 space-y-4">

        {/* 🔥 DELIVERY ADDRESS */}
        <div className="bg-white p-4 shadow rounded">

          {user ? (
            <>
              {selectedAddress ? (
                <div className="flex justify-between items-center">

                  <div>
                    <p className="font-semibold text-lg">
                      Deliver to: {selectedAddress.name}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {selectedAddress.address}, {selectedAddress.city}, {selectedAddress.state} - {selectedAddress.pincode}
                    </p>
                  </div>

                  <button
                    onClick={() => setShowAddressList(!showAddressList)}
                    className="border px-4 py-1 text-blue-500 rounded"
                  >
                    Change
                  </button>

                </div>
              ) : (
                <p className="text-red-500">No address found</p>
              )}

              {showAddressList && (
                <div className="mt-3 space-y-2">
                  {addresses.map(addr => (
                    <div
                      key={addr.id}
                      onClick={() => {
                        setSelectedAddress(addr);
                        setShowAddressList(false);
                      }}
                      className="border p-2 rounded cursor-pointer hover:bg-gray-100"
                    >
                      <p className="font-semibold">{addr.name}</p>
                      <p className="text-sm">
                        {addr.address}, {addr.city}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="flex justify-between items-center">
              <p className="text-gray-600">Login to use address</p>
              <button
                onClick={() => window.location.href = "/login"}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Login
              </button>
            </div>
          )}

        </div>

        {/* PRODUCTS */}
        {products.map(product => (
          <div key={product.id} className="bg-white shadow rounded mb-5">
            <CartRow
              Url={product.thumbnail}
              title={product.title}
              price={product.price}
              id={product.id}
              quantity={pendingCart[product.id]}
              onQuantityChange={handleQuantityChange}
              onRemove={onRemove}
            />
          </div>
        ))}

      </div>

      {/* RIGHT SIDE */}
      <div className="bg-white p-4 shadow rounded h-fit">

        <h2 className="font-bold mb-3 border-b pb-2">PRICE DETAILS</h2>

        <div className="flex justify-between mb-2">
          <span>Price</span>
          <span>₹{totalPrice.toFixed(2)}</span>
        </div>

        <div className="flex justify-between mb-2">
          <span>Delivery</span>
          <span className="text-green-500">FREE</span>
        </div>

        <hr className="my-3" />

        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>₹{totalPrice.toFixed(2)}</span>
        </div>

        {/* 🔥 LOGIN CHECK */}
        <button
          onClick={() => {
            if (!user) {
              alert("Please login to continue checkout 🔐");
              return;
            }

            if (!selectedAddress) {
              alert("Please select address");
              return;
            }

            setShowPaymentOptions(true);
          }}
          className="w-full bg-yellow-500 py-3 mt-5 rounded font-semibold"
        >
          PLACE ORDER
        </button>

      </div>

    </div>
  );
}

export default CartList;