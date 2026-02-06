import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import {
  FaUser,
  FaGasPump,
  FaMapMarkedAlt,
  FaRupeeSign,
  FaTruck,
  FaCheckCircle,
} from "react-icons/fa";

export default function AssignDelivery() {
  const MotionLink = motion(Link);
  const { id } = useParams();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function showBooking() {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/fuelStation/assignDelivery/${id}`,
        { withCredentials: true },
      );

     // console.log(res.data);
      setBookings(res.data);
      setLoading(false);
    }
    showBooking();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Loading booking details...
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        No bookings found for this station.
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-200 via-sky-100 to-purple-200 overflow-hidden p-6">
      {/* Background blobs */}
      <div className="absolute top-[-100px] left-[-100px] w-96 h-96 bg-blue-400/30 rounded-full blur-3xl" />
      <div className="absolute bottom-[-100px] right-[-100px] w-96 h-96 bg-purple-400/30 rounded-full blur-3xl" />

      {/* Cards List */}
      <div className="relative max-w-3xl mx-auto space-y-8">
        {bookings.map((booking) => (
          <motion.div
            key={booking.bookingId}
            initial={{ opacity: 0, y: 80, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 15 }}
            className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-xl sm:text-2xl font-bold flex items-center gap-3">
                <FaTruck className="text-indigo-600" />
                Assign Delivery
              </h1>

              <span className="px-4 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold flex items-center gap-2">
                <FaCheckCircle /> {booking.status}
              </span>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <InfoCard
                icon={<FaUser />}
                label="Customer"
                value={booking.userName}
                color="text-sky-500"
              />
              <InfoCard
                icon={<FaGasPump />}
                label="Fuel Type"
                value={booking.fuelType}
                color="text-green-500"
              />
              <InfoCard
                icon={<FaGasPump />}
                label="Quantity"
                value={`${booking.fuelQty} L`}
                color="text-orange-500"
              />
              <InfoCard
                icon={<FaRupeeSign />}
                label="Total Amount"
                value={`₹ ${booking.totalAmount}`}
                color="text-purple-500"
              />
              <InfoCard
                icon={<FaMapMarkedAlt />}
                label="Delivery Address"
                value={booking.address}
                color="text-red-500"
                wide
              />
            </div>

            {/* Action Button */}
            <MotionLink
              to={`/fuelStation/profile/assignToDeliveryPerson/${booking.bookingId}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-10 w-full py-4 rounded-2xl font-bold text-lg
              bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500
              text-white shadow-xl text-center block
              hover:shadow-2xl transition-all duration-300"
            >
              🚚 Assign to Delivery Partner
            </MotionLink>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* Reusable Info Card */
function InfoCard({ icon, label, value, color, wide }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className={`p-4 rounded-2xl bg-white/80 shadow-lg flex gap-4 items-center ${
        wide ? "sm:col-span-2" : ""
      }`}
    >
      <div className={`text-2xl ${color}`}>{icon}</div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="font-semibold text-gray-800">{value}</p>
      </div>
    </motion.div>
  );
}
