import React, { useEffect, useState } from "react";

function OrdersSection() {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetch(`https://assignment-74-1.onrender.com/api/order/${user.id}`)
      .then(res => res.json())
      .then(data => setOrders(data));
  }, []);

  const steps = [
    "Processing",
    "Shipped",
    "Out for Delivery",
    "Delivered",
  ];

  function getStepIndex(status) {
    return steps.indexOf(status);
  }

  return (
    <div >
      <h2 className="text-2xl font-bold mb-5">My Orders</h2>

      {orders.length === 0 && (
        <p className="text-gray-500">No orders yet</p>
      )}

      {orders.map(order => (
        <div key={order.id} className="border p-5 mb-6 rounded bg-white shadow">

          {/* 🔥 STATUS TEXT */}
          <p className="font-semibold mb-3">
            Order Status:{" "}
            <span className="text-blue-600">{order.status}</span>
          </p>

          {/* 🔥 TIMELINE */}
          <div className="flex items-center justify-between mb-4">

            {steps.map((step, index) => {
              const currentIndex = getStepIndex(order.status);

              return (
                <div key={step} className="flex-1 flex flex-col items-center relative">

                  {/* LINE */}
                  {index !== steps.length - 1 && (
                    <div
                      className={`absolute top-2 left-1/2 w-full h-1 ${
                        index < currentIndex ? "bg-green-500" : "bg-gray-300"
                      }`}
                    ></div>
                  )}

                  {/* DOT */}
                  <div
                    className={`w-5 h-5 rounded-full z-10 ${
                      index <= currentIndex
                        ? "bg-green-500"
                        : "bg-gray-300"
                    }`}
                  ></div>

                  {/* TEXT */}
                  <p className="text-xs mt-2 text-center">{step}</p>
                </div>
              );
            })}
          </div>

          {/* 🔥 ITEMS */}
          <div className="mt-3 space-y-1">
            {order.items.map(item => (
              <div key={item.id} className="flex justify-between text-sm">
                <p className="text-xl font-medium">{item.title}</p>
                <p>₹{item.price} × {item.quantity}</p>
              </div>
            ))}
          </div>

          {/* 🔥 ADDRESS */}
          <p className="text-sm text-gray-600 mt-3">
            Deliver to: {order.address?.name}, {order.address?.city}
          </p>

          {/* 🔥 TOTAL */}
          <p className="font-bold mt-2">
            Total: ₹{order.total_amount}
          </p>

          {/* 🔥 DATE */}
          <p className="text-xs text-gray-400 mt-1">
            {new Date(order.created_at).toLocaleString()}
          </p>

        </div>
      ))}
    </div>
  );
}

export default OrdersSection;