import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { CiCircleRemove } from "react-icons/ci";
import { motion } from "framer-motion";

export default function ShowFuelStations() {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStations() {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/admin/requestedStation`,
          { withCredentials: true },
        );
        setStations(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchStations();
  }, []);

  async function rejectStation(id) {
    if (!window.confirm("Reject this station?")) return;

    await axios.post(
      `${import.meta.env.VITE_API_URL}/admin/reject-station/${id}`,
      {},
      { withCredentials: true },
    );

    setStations((prev) => prev.filter((s) => s._id !== id));
  }

  if (loading)
    return (
      <div className="flex justify-center items-center h-60">
        <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (stations.length === 0)
    return (
      <div className="bg-white/10 p-10 rounded-3xl text-center text-white shadow-xl">
        ✅ No pending station requests
      </div>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
      {stations.map((item, index) => (
        <motion.div
          key={item._id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ scale: 1.04, y: -8 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl p-6 text-white"
        >
          <h3 className="text-xl font-bold mb-3">
            {item.fuelStation.stationName}
          </h3>

          <div className="text-gray-300 text-sm space-y-1">
            <p>
              🛢️ Petrol: <b>{item.fuelStation.petrolQty} L</b>
            </p>
            <p>
              🛢️ Diesel: <b>{item.fuelStation.dieselQty} L</b>
            </p>
          </div>

          <div className="flex gap-4 pt-6">
            <Link
              to={`/admin/profile/payment/${item.fuelStation._id}`}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl 
              font-semibold text-black bg-gradient-to-r from-green-400 to-emerald-500 hover:scale-105 transition"
            >
              <FaCheckCircle /> Approve
            </Link>

            <button
              onClick={() => rejectStation(item._id)}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl 
              font-semibold text-white bg-gradient-to-r from-red-500 to-rose-600 hover:scale-105 transition"
            >
              <CiCircleRemove /> Reject
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
