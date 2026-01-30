import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaTruck,
  FaUserEdit,
  FaSignOutAlt,
  FaCheckCircle,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DeliveryDashboard() {
  const [data, setData] = useState("");
  const [complete, setComplete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const userRes = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/profile`,
        {
          withCredentials: true,
        },
      );

      setData(userRes.data);

      if (userRes.data.isProfileCompleted) {
        const profileRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/deliveryPerson/myProfile`,
          {
            params: { deliveryPersonName: userRes.data.name },
            withCredentials: true,
          },
        );

        setComplete(profileRes.data);
      }
    }

    fetchData();
  }, []);

  async function approvalRequest(id) {
    await axios.post(
      `${import.meta.env.VITE_API_URL}/admin/approvalRequest/${id}`,
      {},
      { withCredentials: true },
    );
    alert("Approval request sent to admin!");
  }

  async function handleLogout() {
    await axios.get(`${import.meta.env.VITE_API_URL}/deliveryPerson/logout`, {
      withCredentials: true,
    });
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white">
      {/* 🔥 NAVBAR */}
      <div className="flex items-center justify-between px-8 py-4 border-b border-white/10 backdrop-blur">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-orange-400 tracking-wide">
            ⛽ Fuel Indeed - Delivery Panel
          </h1>

          {/* ✅ VERIFIED BADGE */}
          {complete?.isVerified && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative group"
            >
              {/* Glow */}
              <div className="absolute inset-0 bg-blue-400 blur-md opacity-60 rounded-full animate-pulse"></div>

              <FaCheckCircle className="relative text-blue-500 text-xl drop-shadow-lg" />

              {/* Tooltip */}
              <div className="absolute left-1/2 -translate-x-1/2 top-7 opacity-0 group-hover:opacity-100 transition text-xs bg-black text-white px-2 py-1 rounded-md whitespace-nowrap">
                Verified Account
              </div>
            </motion.div>
          )}

          {/* ⏳ Pending Badge */}
          {complete && !complete.isVerified && (
            <span className="text-xs px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-400/30">
              ⏳ Pending Verification
            </span>
          )}
        </div>

        <div className="buttons flex gap-6">
          {/* Send approval request if profile completed but not verified */}
          {data.isProfileCompleted && complete && !complete.isVerified && (
            <button
              onClick={() => approvalRequest(complete._id)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition"
            >
              Send Approval Request
            </button>
          )}

          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 transition"
            onClick={handleLogout}
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </div>

      {/* 🚀 MAIN CONTENT */}
      <div className="flex items-center justify-center pt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* 📦 ASSIGNED DELIVERIES */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            className={`bg-white/5 backdrop-blur-xl border rounded-2xl p-10 w-80 cursor-pointer transition ${
              complete?.isVerified
                ? "border-blue-400/50 shadow-blue-500/30"
                : "border-white/10"
            }`}
          >
            <Link to="/deliveryPerson/assigned">
              <div className="flex flex-col items-center text-center">
                <FaTruck className="text-5xl text-orange-400 mb-4" />
                <h2 className="text-xl font-semibold mb-2">
                  Assigned Deliveries
                </h2>
                <p className="text-gray-400 text-sm">
                  View and deliver fuel orders
                </p>

                {!complete?.isVerified && (
                  <p className="text-xs text-yellow-400 mt-3">
                    ⚠ Available after verification
                  </p>
                )}
              </div>
            </Link>
          </motion.div>

          {/* 🧾 COMPLETE / UPDATE PROFILE */}
          {!data.isProfileCompleted ? (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-10 w-80 cursor-pointer hover:border-blue-500 transition"
            >
              <Link to="/deliveryPerson/completeProfile">
                <div className="flex flex-col items-center text-center">
                  <FaUserEdit className="text-5xl text-blue-400 mb-4" />
                  <h2 className="text-xl font-semibold mb-2">
                    Complete Profile
                  </h2>
                  <p className="text-gray-400 text-sm">
                    Update your delivery details
                  </p>
                </div>
              </Link>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-10 w-80 cursor-pointer hover:border-blue-500 transition"
            >
              <Link to="/deliveryPerson/updateProfile">
                <div className="flex flex-col items-center text-center">
                  <FaUserEdit className="text-5xl text-blue-400 mb-4" />
                  <h2 className="text-xl font-semibold mb-2">Update Profile</h2>
                  <p className="text-gray-400 text-sm">
                    Update your delivery details
                  </p>
                </div>
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
