import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaMotorcycle,
  FaCheckCircle,
} from "react-icons/fa";

export default function AssignToDeliveryPerson() {
  const { id } = useParams();
  const [deliveryPersons, setDeliveryPersons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [assigningId, setAssigningId] = useState(null);
  const [stationLocation, setStationLocation] = useState({});
  const [userLocation, setUserLocation] = useState({});

  useEffect(() => {
    async function showNearByDeliveryPersons() {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/fuelStation/assignToDeliveryPerson/${id}`,
          { withCredentials: true },
        );

        setStationLocation({
          stationLng: res.data.lng,
          stationLat: res.data.lat,
        });
        setUserLocation({
          userLng: res.data.userLng,
          userLat: res.data.userLat,
        });

        setDeliveryPersons(res.data.nearbyDelivery || []);
      } catch (err) {
      //  console.error(err);
      } finally {
        setLoading(false);
      }
    }
    showNearByDeliveryPersons();
  }, [id]);

  async function assignOrder(deliveryId) {
    try {
      setAssigningId(deliveryId);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/fuelStation/assignOrder/${deliveryId}`,
        {
          bookingId: id, // ✅ THIS id IS BOOKING ID
        },
        { withCredentials: true },
      );

      window.open(res.data.whatsappLink, "_blank");
    } catch (err) {
      alert("Failed to assign order");
    } finally {
      setAssigningId(null);
    }
  }

  /* 🔄 Loading skeleton */
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-sky-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-pulse text-xl font-semibold text-emerald-700">
          Finding nearby delivery partners...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-emerald-50 via-sky-50 to-indigo-100">
      {/* 🌈 Background blobs */}
      <div className="absolute top-[-120px] left-[-120px] w-[420px] h-[420px] bg-green-300/30 rounded-full blur-3xl" />
      <div className="absolute bottom-[-140px] right-[-140px] w-[420px] h-[420px] bg-emerald-400/30 rounded-full blur-3xl" />
      <div className="absolute top-[30%] right-[-160px] w-[360px] h-[360px] bg-sky-300/30 rounded-full blur-3xl" />

      {/* 🧭 Header */}
      <div className="sticky top-0 z-20 backdrop-blur-xl bg-white/50 border-b border-white/40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-emerald-700 flex items-center gap-3">
            <FaMotorcycle /> Assign Delivery Partner
          </h1>

          <span className="text-sm bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full font-semibold">
            {deliveryPersons.length} Available
          </span>
        </div>
      </div>

      {/* 📦 Content */}
      <div className="relative z-10 max-w-7xl mx-auto p-6">
        {deliveryPersons.length === 0 ? (
          <div className="text-center mt-20 text-gray-500 text-lg">
            No delivery partners available nearby.
          </div>
        ) : (
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.08 } },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {deliveryPersons.map((person) => (
                <motion.div
                  key={person._id}
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    show: { opacity: 1, y: 0 },
                  }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50"
                >
                  {/* ✨ Status glow */}
                  <div
                    className={`absolute -top-12 -right-12 w-44 h-44 rounded-full blur-3xl opacity-30 ${
                      person.status === "available"
                        ? "bg-green-400"
                        : "bg-red-400"
                    }`}
                  />

                  {/* 🧑 Header */}
                  <div className="p-5 flex items-center gap-4">
                    <div className="relative">
                      <img
                        src={`${import.meta.env.VITE_API_URL}/${person.image}`}
                        alt="delivery"
                        className="w-16 h-16 rounded-full object-cover ring-4 ring-white shadow-lg"
                        onError={(e) => {
                          e.target.src = "/avatar.png";
                        }}
                      />

                      <span
                        className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-white ${
                          person.status === "available"
                            ? "bg-green-500 animate-pulse"
                            : "bg-red-500"
                        }`}
                      />
                    </div>

                    <div className="flex-1">
                      <h2 className="text-lg font-bold text-gray-800">
                        {person.deliveryPersonName}
                      </h2>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <FaPhoneAlt /> {person.contact}
                      </div>
                    </div>

                    <span
                      className={`text-xs px-3 py-1 rounded-full font-bold ${
                        person.status === "available"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {person.status}
                    </span>
                  </div>

                  {/* 📍 Body */}
                  <div className="px-5 pb-5 space-y-4">
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <FaMapMarkerAlt />
                      {(person.distance / 1000).toFixed(2)} km away
                    </div>

                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      whileHover={{ scale: 1.03 }}
                      disabled={
                        assigningId === person._id ||
                        person.status !== "available"
                      }
                      onClick={() => assignOrder(person._id)}
                      className={`w-full py-3 rounded-xl font-bold text-white shadow-lg transition
                        ${
                          person.status === "available"
                            ? "bg-gradient-to-r from-green-500 to-emerald-500"
                            : "bg-gray-400 cursor-not-allowed"
                        }`}
                    >
                      {assigningId === person._id
                        ? "Assigning..."
                        : "Assign Order"}
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
