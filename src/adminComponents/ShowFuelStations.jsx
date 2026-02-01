import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import { CiCircleRemove } from "react-icons/ci";

export default function ShowFuelStations() {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/admin/requestedStation`,
          { withCredentials: true },
        );

        setStations(res.data);
      } catch {
        alert("Failed to load stations");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  async function rejectStation(id) {
    if (!confirm("Reject station?")) return;

    await axios.post(
      `${import.meta.env.VITE_API_URL}/admin/reject-station/${id}`,
      {},
      { withCredentials: true },
    );

    setStations((prev) => prev.filter((s) => s._id !== id));
  }

  if (loading) return <Loader />;

  if (!stations.length) return <Empty msg="No pending station requests" />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {stations.map((item, i) => (
        <motion.div
          key={item._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          whileHover={{ scale: 1.03 }}
          className="card"
        >
          <h3 className="card-title">{item.fuelStation.stationName}</h3>

          <div className="text-gray-300 space-y-1 text-sm">
            <p>
              🛢️ Petrol: <b>{item.fuelStation.petrolQty} L</b>
            </p>
            <p>
              🛢️ Diesel: <b>{item.fuelStation.dieselQty} L</b>
            </p>
          </div>

          <div className="flex gap-3 pt-5">
            <Link
              to={`/admin/profile/payment/${item.fuelStation._id}`}
              className="btn-green"
            >
              <FaCheckCircle /> Approve
            </Link>

            <button onClick={() => rejectStation(item._id)} className="btn-red">
              <CiCircleRemove /> Reject
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ===== Reusable ===== */

function Loader() {
  return (
    <div className="flex justify-center h-60 items-center">
      <div className="spinner" />
    </div>
  );
}

function Empty({ msg }) {
  return <div className="empty-box">✅ {msg}</div>;
}
