import axios from "axios";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaPhoneAlt, FaMapMarkerAlt, FaUserCheck } from "react-icons/fa";
import { CiCircleRemove } from "react-icons/ci";

export default function ShowDeliveryPersons() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/admin/showRequestedDelivery`,
          { withCredentials: true },
        );
        setData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function approveDelivery(id) {
    if (!window.confirm("Approve this delivery person?")) return;

    setProcessingId(id);

    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/admin/approve-delivery/${id}`,
      {},
      { withCredentials: true },
    );

    window.open(res.data.whatsappLink, "_blank");
    setData((prev) => prev.filter((p) => p.deliveryPersonId._id !== id));
    setProcessingId(null);
  }

  async function rejectDelivery(id) {
    if (!window.confirm("Reject this delivery person?")) return;

    setProcessingId(id);

    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/admin/reject-delivery/${id}`,
      {},
      { withCredentials: true },
    );

    window.open(res.data.whatsappLink, "_blank");
    setData((prev) => prev.filter((p) => p.deliveryPersonId._id !== id));
    setProcessingId(null);
  }

  if (loading)
    return (
      <div className="flex justify-center items-center h-60">
        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (data.length === 0)
    return (
      <div className="bg-white/10 p-10 rounded-3xl text-center text-white shadow-xl">
        ✅ No pending delivery requests
      </div>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
      {data.map((person, index) => {
        const dp = person.deliveryPersonId;

        return (
          <motion.div
            key={dp._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.04, y: -8 }}
            className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl p-6 text-white"
          >
            <div className="absolute top-4 right-4 text-xs bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full">
              Pending
            </div>

            <div className="flex justify-center -mt-16 mb-4">
              <div className="w-28 h-28 rounded-full border-4 border-white/30 overflow-hidden shadow-xl bg-black">
                <img
                  src={`${import.meta.env.VITE_API_URL}/deliveryPerson/image/${dp._id}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="text-center space-y-3">
              <h2 className="text-lg font-bold flex justify-center gap-2">
                <FaUserCheck className="text-green-400" />
                {dp.deliveryPersonName}
              </h2>

              <p className="flex justify-center gap-2 text-gray-300 text-sm">
                <FaPhoneAlt className="text-blue-400" /> {dp.contact}
              </p>

              <p className="flex justify-center gap-2 text-gray-300 text-sm">
                <FaMapMarkerAlt className="text-red-400" /> {dp.address}
              </p>

              <div className="flex gap-4 pt-6">
                <button
                  disabled={processingId === dp._id}
                  onClick={() => approveDelivery(dp._id)}
                  className="flex-1 py-2 rounded-xl bg-gradient-to-r from-green-400 to-emerald-500 
                  text-black font-semibold hover:scale-105 transition disabled:opacity-50"
                >
                  {processingId === dp._id ? "Processing..." : "Approve"}
                </button>

                <button
                  disabled={processingId === dp._id}
                  onClick={() => rejectDelivery(dp._id)}
                  className="flex-1 py-2 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 
                  text-white font-semibold hover:scale-105 transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <CiCircleRemove className="text-xl" /> Reject
                </button>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
