import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaUser,
  FaGasPump,
  FaRupeeSign,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";
import axios from "axios";

export default function AssignSpeedDelivery() {
  const location = useLocation();
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    if (location.state?.bookings) {
      setUserData(location.state.bookings);
    }
  }, [location.state]);

  if (!userData || userData.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-gray-600">
        No Speed Delivery Orders Found ⚡
      </div>
    );
  }

  async function assignSpeedDeliveryToDeliveryPerson(bookingId) {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/fuelStation/assignSpeedOrderToDeliveryPerson/${bookingId}`,
      {},
      { withCredentials: true },
    );
    window.open(res.data.whatsappLink, "_blank");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-100 p-6">
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-extrabold text-orange-700 mb-8 flex items-center gap-3"
      >
        ⚡ Speed Delivery Orders
        <span className="text-sm bg-orange-200 text-orange-800 px-3 py-1 rounded-full">
          {userData.length}
        </span>
      </motion.h1>

      {/* Grid */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.08 } },
        }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {userData.map((user) => (
          <motion.div
            key={user._id}
            variants={{
              hidden: { opacity: 0, y: 40, scale: 0.95 },
              show: { opacity: 1, y: 0, scale: 1 },
            }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-orange-100 overflow-hidden"
          >
            {/* Glow */}
            <div className="absolute -top-16 -right-16 w-40 h-40 bg-orange-400/30 rounded-full blur-3xl" />

            {/* Card Content */}
            <div className="relative p-6 space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <FaUser className="text-orange-500" />
                  {user.userName}
                </h2>

                <span
                  className={`text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1
                    ${
                      user.status === "confirmed" ||
                      user.status === "processing"
                        ? "bg-yellow-100 text-yellow-700"
                        : user.status === "out_for_delivery"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                    }
                  `}
                >
                  {user.status === "delivered" ? (
                    <FaCheckCircle />
                  ) : (
                    <FaClock />
                  )}
                  {user.status}
                </span>
              </div>

              {/* Info Rows */}
              <InfoRow
                icon={<FaGasPump />}
                label="Fuel Type"
                value={user.fuelType}
                color="text-green-600"
              />

              <InfoRow
                icon={<FaGasPump />}
                label="Quantity"
                value={`${user.fuelQty} L`}
                color="text-blue-600"
              />

              <InfoRow
                icon={<FaRupeeSign />}
                label="Rate"
                value={`₹ ${user.fuelRate}`}
                color="text-purple-600"
              />

              <InfoRow
                icon={<FaRupeeSign />}
                label="Total Amount"
                value={`₹ ${user.totalAmount}`}
                color="text-orange-600"
              />

              {/* Action Button */}
              <motion.button
                onClick={() => assignSpeedDeliveryToDeliveryPerson(user._id)}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.03 }}
                className="w-full mt-4 py-3 rounded-xl font-bold text-white
                bg-gradient-to-r from-orange-500 to-red-500 shadow-lg hover:shadow-xl transition"
              >
                🚚 Assign Delivery Boy
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

/* 🔹 Reusable Info Row */
function InfoRow({ icon, label, value, color }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <div className="flex items-center gap-2 text-gray-600">
        <span className={`${color}`}>{icon}</span>
        {label}
      </div>
      <span className="font-semibold text-gray-800">{value}</span>
    </div>
  );
}
