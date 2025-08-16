import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard({ user, setUser }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <div className="flex flex-col max-w-3xl m-auto mt-10 mb-10 md:flex-row  bg-gray-100">
      <main className="flex-1 p-6 md:p-10">
        <div className="bg-white shadow rounded-lg p-6 md:p-8 mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 text-center md:text-left">
            Welcome, {user.full_name}! 🎉
          </h1>
          <p className="text-gray-600 text-center md:text-left">
            Here's your dashboard overview. Manage your account and check your stats.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Email</h3>
            <p className="text-gray-500">{user.email}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Role</h3>
            <p className="text-gray-500">{user?.role || "Member"}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Status</h3>
            <p className="text-gray-500">Active</p>
          </div>
        </div>
        <div className="mt-10 text-center flex justify-around">

          <button
          onClick={() => navigate('/')}
          className="bg-blue-800 text-xl text-white px-5 py-3 rounded-lg hover:bg-blue-500 transition"
          >Back to Home
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-600 text-xl text-white px-5 py-3 rounded-lg hover:bg-red-400 transition"
          >
            Logout
          </button>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;



























