
import React, { useState } from "react";
import AddressSection from "./AddressSection";
import { FaUser, FaBox, FaMapMarkerAlt, FaSignOutAlt } from "react-icons/fa";
import OrdersSection from "./OrdersSection";

function Dashboard({ user, setUser }) {
  const [activeTab, setActiveTab] = useState("profile");

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  }

  return (
    <div className="max-w-6xl m-auto mt-6 px-4 flex flex-col md:flex-row items-start gap-6">

      {/* 🔥 LEFT CARD */}
      <div className="md:w-1/4 w-full bg-white shadow rounded-lg p-4 flex flex-col ">

        {/* TOP */}
        <div>

          {/* USER */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {user.fullName[0]}
            </div>
            <div>
              <p className="text-sm text-gray-500">Hello,</p>
              <p className="font-semibold">{user.fullName}</p>
            </div>
          </div>

          <hr className="my-3" />

          {/* MENU */}
          <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible">

            <button
              onClick={() => setActiveTab("profile")}
              className={`flex items-center gap-2 px-3 py-2 rounded transition whitespace-nowrap ${
                activeTab === "profile"
                  ? "bg-blue-100 text-blue-600 font-medium"
                  : "hover:bg-gray-100"
              }`}
            >
              <FaUser />
              Profile
            </button>

            <button
              onClick={() => setActiveTab("orders")}
              className={`flex items-center gap-2 px-3 py-2 rounded transition whitespace-nowrap ${
                activeTab === "orders"
                  ? "bg-blue-100 text-blue-600 font-medium"
                  : "hover:bg-gray-100"
              }`}
            >
              <FaBox />
              Orders
            </button>

            <button
              onClick={() => setActiveTab("address")}
              className={`flex items-center gap-2 px-3 py-2 rounded transition whitespace-nowrap ${
                activeTab === "address"
                  ? "bg-blue-100 text-blue-600 font-medium"
                  : "hover:bg-gray-100"
              }`}
            >
              <FaMapMarkerAlt />
              Address
            </button>

          </div>
        </div>

        {/* 🔥 LOGOUT */}
        <div className="mt-3 pt-4 border-t">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-3 py-2 text-red-500 hover:bg-gray-100 rounded transition"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>

      </div>

      {/* 🔥 RIGHT CONTENT */}
      <div className="md:w-3/4 w-full bg-white shadow rounded-lg p-6">

        {/* PROFILE */}
        {activeTab === "profile" && (
          <div>
            <h2 className="text-xl md:text-2xl font-bold mb-4">
              Personal Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                value={user.fullName.split(" ")[0]}
                readOnly
                className="border p-2 rounded w-full"
              />
              <input
                value={user.fullName.split(" ")[1] || ""}
                readOnly
                className="border p-2 rounded w-full"
              />
            </div>

            <div className="mt-5">
              <p className="font-semibold">Email Address</p>
              <input
                value={user.email}
                readOnly
                className="border p-2 w-full mt-2 rounded"
              />
            </div>
          </div>
        )}

        {/* ORDERS */}
       {activeTab === "orders" && <OrdersSection />}

        {/* ADDRESS */}
        {activeTab === "address" && <AddressSection />}

      </div>

    </div>
  );
}

export default Dashboard;

























