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
      <div className="min-h-screen flex items-center justify-center text-lg font-semibold animate-pulse">
        Loading delivery team...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50 p-6">
      {/* 🧭 Header */}
      <div className="max-w-7xl mx-auto mb-10 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800">
          🚚 Delivery Team
        </h1>
        <p className="text-gray-500 mt-2">
          Your registered and verified delivery partners
        </p>

        <div className="mt-4 flex justify-center gap-4">
          <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full font-semibold text-sm">
            {deliveryPersons.filter((d) => d.isVerified).length} Verified
          </span>
          <span className="bg-gray-100 text-gray-700 px-4 py-1 rounded-full font-semibold text-sm">
            {deliveryPersons.length} Total
          </span>
        </div>
      </div>

      {/* 🧱 Grid */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.08 } },
        }}
        className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {deliveryPersons.map((person) => (
          <motion.div
            key={person._id}
            variants={{
              hidden: { opacity: 0, y: 30 },
              show: { opacity: 1, y: 0 },
            }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group relative bg-white/80 backdrop-blur-xl rounded-3xl overflow-hidden 
                       border border-white/60 shadow-lg hover:shadow-2xl transition-all"
          >
            {/* 🖼 Image */}
            <div className="relative overflow-hidden">
              <img
                src={`${import.meta.env.VITE_API_URL}/deliveryPerson/image/${person._id}`}
                alt={person.deliveryPersonName}
                className="w-full h-52 object-cover group-hover:scale-110 transition duration-500"
                onError={(e) => (e.target.src = "/avatar.png")}
              />

              {/* 🏷 Status Badge */}
              <div
                className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold shadow flex items-center gap-1
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

            {/* 📄 Info */}
            <div className="p-5 space-y-3">
              <h2 className="text-lg font-bold text-gray-800">
                {person.deliveryPersonName}
              </h2>

              <div className="text-sm text-gray-600 space-y-2">
                <div className="flex items-center gap-2">
                  <FaPhoneAlt className="text-sky-500" />
                  {person.contact}
                </div>

                <div className="flex items-start gap-2">
                  <FaMapMarkerAlt className="text-red-500 mt-1" />
                  {person.address}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
