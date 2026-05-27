import React, { useEffect, useState } from "react";
import { FaEllipsisV } from "react-icons/fa";

function AddressSection() {
  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  // ✅ FETCH ADDRESSES
  useEffect(() => {
    if (!userId) return;

    fetch(`https://assignment-74-1.onrender.com/api/address/${userId}`)
      .then(res => res.json())
      .then(data => setAddresses(data))
      .catch(err => console.log(err));
  }, [userId]);

  // ✅ INPUT CHANGE
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // ✅ VALIDATION
  function validateForm() {
    if (!form.name.trim()) return "Name is required";
    if (!form.phone.trim()) return "Phone is required";
    if (!/^[0-9]{10}$/.test(form.phone)) return "Invalid phone number";
    if (!form.address.trim()) return "Address is required";
    if (!form.city.trim()) return "City is required";
    if (!form.state.trim()) return "State is required";
    if (!form.pincode.trim()) return "Pincode is required";
    if (!/^[0-9]{6}$/.test(form.pincode)) return "Invalid pincode";

    return null;
  }

  // ✅ ADD ADDRESS
  async function handleAdd() {
    const error = validateForm();

    if (error) {
      setErrorMsg(error);
      return;
    }

    const res = await fetch("https://assignment-74-1.onrender.com/api/address", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...form, user_id: userId }),
    });

    const data = await res.json();

    if (data.error) {
      setErrorMsg(data.error);
      return;
    }

    setAddresses([data, ...addresses]);
    resetForm();
  }

  // ✅ EDIT
  function handleEdit(a) {
    setForm(a);
    setEditingId(a.id);
    setShowForm(true);
    setErrorMsg("");
  }

  // ✅ UPDATE ADDRESS
  async function handleUpdate() {
    const error = validateForm();

    if (error) {
      setErrorMsg(error);
      return;
    }

    await fetch(`https://assignment-74-1.onrender.com/api/address/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, user_id: userId }),
    });

    const updated = addresses.map(a =>
      a.id === editingId ? { ...form, id: editingId } : a
    );

    setAddresses(updated);
    resetForm();
  }

  // ✅ DELETE
  async function handleDelete(id) {
    await fetch(`https://assignment-74-1.onrender.com/api/address/${id}/${userId}`, {
      method: "DELETE",
    });

    setAddresses(addresses.filter(a => a.id !== id));
  }

  // ✅ RESET FORM
  function resetForm() {
    setShowForm(false);
    setEditingId(null);
    setErrorMsg("");
    setForm({
      name: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
    });
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Manage Addresses</h2>

      {/* 🔥 ADD BUTTON */}
      <div
        onClick={() => {
          setShowForm(!showForm);
          setEditingId(null);
          setErrorMsg("");
        }}
        className="border border-dashed border-gray-400 p-4 rounded cursor-pointer hover:bg-gray-50 flex items-center gap-2 mb-5"
      >
        <span className="text-blue-600 text-xl">+</span>
        <span className="text-blue-600 font-medium">
          ADD A NEW ADDRESS
        </span>
      </div>

      {/* 🔥 FORM */}
      {showForm && (
        <div className="bg-gray-50 p-4 rounded mb-5">
          {errorMsg && (
            <p className="text-red-500 mb-2">{errorMsg}</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

            <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="border p-2 rounded" />
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="border p-2 rounded" />
            <input name="address" value={form.address} onChange={handleChange} placeholder="Address" className="border p-2 rounded md:col-span-2" />
            <input name="city" value={form.city} onChange={handleChange} placeholder="City" className="border p-2 rounded" />
            <input name="state" value={form.state} onChange={handleChange} placeholder="State" className="border p-2 rounded" />
            <input name="pincode" value={form.pincode} onChange={handleChange} placeholder="Pincode" className="border p-2 rounded" />

          </div>

          <button
            onClick={editingId ? handleUpdate : handleAdd}
            className="bg-blue-600 text-white px-6 py-2 mt-4 rounded hover:bg-blue-700"
          >
            {editingId ? "UPDATE ADDRESS" : "SAVE ADDRESS"}
          </button>
        </div>
      )}

      {/* 🔥 ADDRESS LIST */}
      <div className="space-y-4">
        {addresses.length === 0 && (
          <p className="text-gray-500">No address found</p>
        )}

        {addresses.map((a) => (
          <div
            key={a.id}
            className="border rounded p-4 bg-white hover:shadow-sm transition flex justify-between"
          >
            <div>
              <p className="font-semibold text-gray-800">
                {a.name} &nbsp;&nbsp; {a.phone}
              </p>

              <p className="text-gray-600 text-sm mt-1">
                {a.address}, {a.city}, {a.state} -{" "}
                <span className="font-semibold">{a.pincode}</span>
              </p>
            </div>

            <div className="relative group">
              <FaEllipsisV className="cursor-pointer text-gray-500" />

              <div className="absolute right-0 hidden group-hover:block bg-white shadow rounded mt-2 w-28 z-10">
                <button
                  onClick={() => handleEdit(a)}
                  className="block w-full text-left px-3 py-2 hover:bg-gray-100"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(a.id)}
                  className="block w-full text-left px-3 py-2 text-red-500 hover:bg-gray-100"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AddressSection;