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
      <div className="min-h-screen flex items-center justify-center text-center px-4">
        <p className="text-lg sm:text-xl font-semibold text-gray-600">
          No Speed Delivery Orders Found ⚡
        </p>
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
    <div
      className="
        min-h-screen
        bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-100

        px-4 py-6
        sm:px-6 sm:py-8
        lg:px-10 lg:py-10
      "
    >
      {/* ================= HEADER ================= */}

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="
          mb-8
          flex flex-col sm:flex-row
          sm:items-center
          sm:justify-between
          gap-3
        "
      >
        <h1
          className="
            text-2xl sm:text-3xl lg:text-4xl
            font-extrabold
            text-orange-700
            flex items-center gap-2
          "
        >
          ⚡ Speed Delivery Orders
        </h1>

        <span
          className="
            self-start sm:self-auto
            text-xs sm:text-sm
            bg-orange-200 text-orange-800
            px-3 py-1 rounded-full font-semibold
          "
        >
          {userData.length} Orders
        </span>
      </motion.div>

      {/* ================= GRID ================= */}

      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: { staggerChildren: 0.07 },
          },
        }}
        className="
          grid grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          gap-5 sm:gap-6
        "
      >
        {userData.map((user) => (
          <motion.div
            key={user._id}
            variants={{
              hidden: { opacity: 0, y: 30, scale: 0.95 },
              show: { opacity: 1, y: 0, scale: 1 },
            }}
            whileHover={{ y: -6, scale: 1.01 }}
            className="
              relative
              bg-white/90 backdrop-blur-xl
              rounded-2xl
              shadow-lg
              border border-orange-100
              overflow-hidden
              flex flex-col
            "
          >
            {/* Glow Effect */}
            <div className="absolute -top-20 -right-20 w-44 h-44 bg-orange-400/20 rounded-full blur-3xl" />

            {/* ================= CARD ================= */}

            <div className="relative p-4 sm:p-5 flex flex-col gap-4 flex-1">
              {/* HEADER */}
              <div className="flex items-start justify-between gap-3">
                <h2
                  className="
                    text-sm sm:text-base
                    font-bold text-gray-800
                    flex items-center gap-2
                    truncate
                  "
                >
                  <FaUser className="text-orange-500 shrink-0" />
                  <span className="truncate">{user.userName}</span>
                </h2>

                <div className="flex flex-wrap gap-2 justify-end">
                  <span className="bg-stone-500 text-white px-2 py-0.5 rounded text-xs">
                    {user.payment}
                  </span>

                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-semibold flex items-center gap-1
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
              </div>

              {/* INFO */}
              <div className="space-y-2">
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
                  label="Total"
                  value={`₹ ${user.totalAmount}`}
                  color="text-orange-600"
                />
              </div>

              {/* BUTTON */}
              <motion.button
                onClick={() => assignSpeedDeliveryToDeliveryPerson(user._id)}
                whileTap={{ scale: 0.96 }}
                whileHover={{ scale: 1.02 }}
                className="
                  mt-auto
                  w-full
                  py-2.5 sm:py-3

                  rounded-xl
                  text-sm sm:text-base
                  font-semibold text-white

                  bg-gradient-to-r from-orange-500 to-red-500

                  shadow-md hover:shadow-lg
                  transition
                "
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

/* ================= INFO ROW ================= */

function InfoRow({ icon, label, value, color }) {
  return (
    <div className="flex items-center justify-between gap-3 text-xs sm:text-sm">
      <div className="flex items-center gap-2 text-gray-600 min-w-0">
        <span className={`${color} shrink-0`}>{icon}</span>

        <span className="truncate">{label}</span>
      </div>

      <span className="font-semibold text-gray-800 truncate">{value}</span>
    </div>
  );
}
