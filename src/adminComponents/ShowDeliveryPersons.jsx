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
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  async function handleAction(id, type) {
    if (!confirm(`${type} this delivery person?`)) return;

    setProcessingId(id);

    const url =
      type === "approve"
        ? `/admin/approve-delivery/${id}`
        : `/admin/reject-delivery/${id}`;

    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}${url}`,
      {},
      { withCredentials: true },
    );

    window.open(res.data.whatsappLink, "_blank");

    setData((prev) => prev.filter((p) => p.deliveryPersonId._id !== id));

    setProcessingId(null);
  }

  if (loading) return <Loader />;

  if (!data.length) return <Empty msg="No pending delivery requests" />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
      {data.map((item, i) => {
        const dp = item.deliveryPersonId;

        return (
          <motion.div
            key={dp._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ scale: 1.03 }}
            className="card relative"
          >
            <Badge />

            <Avatar src={dp.image} />

            <div className="text-center space-y-2">
              <h3 className="font-bold flex justify-center gap-2">
                <FaUserCheck className="text-green-400" />
                {dp.deliveryPersonName}
              </h3>

              <p className="info">
                <FaPhoneAlt /> {dp.contact}
              </p>

              <p className="info">
                <FaMapMarkerAlt /> {dp.address}
              </p>

              <div className="flex gap-3 pt-4">
                <button
                  disabled={processingId === dp._id}
                  onClick={() => handleAction(dp._id, "approve")}
                  className="btn-green"
                >
                  {processingId === dp._id ? "Processing..." : "Approve"}
                </button>

                <button
                  disabled={processingId === dp._id}
                  onClick={() => handleAction(dp._id, "reject")}
                  className="btn-red"
                >
                  <CiCircleRemove /> Reject
                </button>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ===== Components ===== */

function Avatar({ src }) {
  return (
    <div className="flex justify-center -mt-14 mb-3">
      <img
        src={`${import.meta.env.VITE_API_URL}/${src}`}
        className="w-28 h-28 rounded-full border-4 border-white/30 object-cover bg-black"
      />
    </div>
  );
}

function Badge() {
  return (
    <div className="absolute top-3 right-3 text-xs bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full">
      Pending
    </div>
  );
}

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
