import axios from "axios";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

export default function ShowStationsDeliveryPersons() {
  const [deliveryPersons, setDeliveryPersons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function showDeliveryPersons() {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/fuelStation/showDeliveryPersons`,
        { withCredentials: true },
      );
      setDeliveryPersons(res.data || []);
      setLoading(false);
    }
    showDeliveryPersons();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-lg font-semibold animate-pulse">
        Loading delivery team...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50 p-4 sm:p-6">
      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-8 text-center">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800">
          🚚 Delivery Team
        </h1>

        <p className="text-gray-500 mt-2 text-sm sm:text-base">
          Your registered and verified delivery partners
        </p>

        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full font-semibold text-sm">
            {deliveryPersons.filter((d) => d.isVerified).length} Verified
          </span>

          <span className="bg-gray-100 text-gray-700 px-4 py-1 rounded-full font-semibold text-sm">
            {deliveryPersons.length} Total
          </span>
        </div>
      </div>

      {/* GRID */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.08 } },
        }}
        className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5"
      >
        {deliveryPersons.map((person) => (
          <motion.div
            key={person._id}
            variants={{
              hidden: { opacity: 0, y: 30 },
              show: { opacity: 1, y: 0 },
            }}
            whileHover={{ y: -6 }}
            className="bg-white/90 rounded-2xl overflow-hidden 
            border shadow hover:shadow-xl transition"
          >
            {/* IMAGE */}
            <div className="relative">
              <img
                src={`${import.meta.env.VITE_API_URL}/${person.image}`}
                alt={person.deliveryPersonName}
                className="w-full h-40 sm:h-44 md:h-48 object-cover"
                onError={(e) => (e.target.src = "/avatar.png")}
              />

              {/* STATUS */}
              <div
                className={`absolute top-2 left-2 px-2 py-0.5 rounded-full 
                text-xs font-bold flex items-center gap-1
                ${
                  person.isVerified
                    ? "bg-green-500 text-white"
                    : "bg-gray-500 text-white"
                }`}
              >
                {person.isVerified ? <FaCheckCircle /> : <FaTimesCircle />}
                {person.isVerified ? "Verified" : "Not Verified"}
              </div>
            </div>

            {/* INFO */}
            <div className="p-4 space-y-2 min-w-0">
              <h2 className="font-bold text-gray-800 truncate">
                {person.deliveryPersonName}
              </h2>

              <div className="text-sm text-gray-600 space-y-1">
                <div className="flex items-center gap-2">
                  <FaPhoneAlt className="text-sky-500" />
                  <span className="truncate">{person.contact}</span>
                </div>

                <div className="flex items-start gap-2">
                  <FaMapMarkerAlt className="text-red-500 mt-1" />
                  <span className="line-clamp-2">{person.address}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
