import { useState } from "react";
import { motion } from "framer-motion";

export default function MyProfile() {
  const [edit, setEdit] = useState(false);

  // Example cart data
  const cartItems = [
    { name: "Luxury Sofa", qty: 1, price: 49999 },
    { name: "Wooden Dining Table", qty: 1, price: 29999 },
    { name: "Office Chair", qty: 2, price: 7999 },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden py-16">

      {/* ===== BACKGROUND IMAGE ===== */}
      <div className="absolute inset-0 -z-20">
        <img
          src="https://t4.ftcdn.net/jpg/04/54/05/57/360_F_454055775_7QBsHbb6Jo4TrGLkFDoMqGwNiF55ydqr.jpg"
          alt="background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* ===== DARK OVERLAY ===== */}
      <div className="absolute inset-0 -z-10 bg-black/20" />

      {/* ===== PREMIUM COLOR BLOBS ===== */}
      <div className="absolute inset-0 -z-5 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[520px] h-[520px] bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-[520px] h-[520px] bg-indigo-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-[420px] h-[420px] bg-sky-400/20 rounded-full blur-3xl" />
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-12 gap-10">

        {/* ================= LEFT PROFILE ================= */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="col-span-12 lg:col-span-4 space-y-6"
        >
          {/* PROFILE CARD */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl p-8 text-center hover:shadow-2xl transition">
            <motion.img
              whileHover={{ scale: 1.05 }}
              src="https://i.pravatar.cc/150?img=12"
              alt="profile"
              className="w-28 h-28 rounded-full mx-auto object-cover border-4 border-blue-600"
            />
            <h2 className="mt-5 text-2xl font-semibold tracking-tight">
              Adarsh KV
            </h2>
            <p className="text-sm text-gray-500">adarsh@email.com</p>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setEdit(!edit)}
              className="mt-6 w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-medium hover:opacity-90 transition shadow-lg"
            >
              {edit ? "Save Profile" : "Edit Profile"}
            </motion.button>

           
          </div>

          {/* MEMBERSHIP CARD */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-lg p-6 text-center hover:shadow-2xl transition"
          >
            <h3 className="text-lg font-semibold mb-2">Membership Status</h3>
            <p className="text-sm text-gray-600">Premium Member</p>
            <div className="mt-3 flex justify-center gap-2">
              <span className="bg-yellow-400/30 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold">
                Active
              </span>
              <span className="bg-green-400/30 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                Valid till 2026
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* ================= RIGHT CONTENT ================= */}
        <div className="col-span-12 lg:col-span-8 space-y-8">

          {/* PERSONAL INFO */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-lg p-8"
          >
            <h3 className="text-xl font-semibold mb-6">Personal Information</h3>

            <div className="grid md:grid-cols-2 gap-6">
              <Input label="Full Name" value="Adarsh KV" editable={edit} />
              <Input label="Phone Number" value="+91 9876543210" editable={edit} />
              <Input label="Email" value="adarsh@email.com" editable={edit} />
              <Input label="Gender" value="Male" editable={edit} />
            </div>
          </motion.section>

          {/* ADDRESS */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-lg p-8"
          >
            <h3 className="text-xl font-semibold mb-6">Saved Addresses</h3>

            <div className="grid md:grid-cols-2 gap-5">
              <AddressCard title="Home" address="123, MG Road, Kochi, Kerala - 682001" />
              <AddressCard title="Office" address="Infopark, Kakkanad, Kochi - 682042" />

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="border-2 border-dashed rounded-2xl flex items-center justify-center cursor-pointer hover:border-blue-600 transition p-6"
              >
                <span className="text-sm font-semibold text-blue-600">
                  + Add New Address
                </span>
              </motion.div>
            </div>
          </motion.section>

          {/* CART / ORDER DETAILS */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-lg p-8"
          >
            <h3 className="text-xl font-semibold mb-6">Cart / Order Details</h3>

            <div className="space-y-4">
              {cartItems.map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  className="flex justify-between items-center bg-gray-50 rounded-xl p-4 shadow-sm transition"
                >
                  <div>
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                  </div>
                  <p className="font-semibold">₹{item.price.toLocaleString()}</p>
                </motion.div>
              ))}

              <div className="flex justify-between mt-4 pt-4 border-t font-semibold text-lg">
                <span>Total</span>
                <span>
                  ₹
                  {cartItems.reduce((total, item) => total + item.price * item.qty, 0).toLocaleString()}
                </span>
              </div>
            </div>
          </motion.section>

        </div>
      </div>
    </div>
  );
}

/* ================= INPUT ================= */
function Input({ label, value, editable }) {
  return (
    <div className="flex flex-col">
      <label className="text-xs uppercase tracking-wide text-gray-500 mb-2">
        {label}
      </label>
      <input
        disabled={!editable}
        defaultValue={value}
        className={`px-4 py-3 rounded-xl border text-sm
          ${editable
            ? "border-gray-300 focus:border-blue-600 bg-white"
            : "bg-gray-100 border-gray-200"}
          focus:outline-none transition`}
      />
    </div>
  );
}

/* ================= ADDRESS CARD ================= */
function AddressCard({ title, address }) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white border rounded-2xl p-5 hover:shadow-lg transition"
    >
      <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
        {title}
      </span>
      <p className="mt-3 text-sm text-gray-700 leading-relaxed">{address}</p>
      <button className="mt-4 text-sm text-blue-600 font-semibold hover:underline">
        Edit Address
      </button>
    </motion.div>
  );
}
