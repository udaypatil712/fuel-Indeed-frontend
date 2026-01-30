import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaGasPump, FaTruck, FaSignOutAlt, FaUserCircle } from "react-icons/fa";

export default function Sidebar({ user, setNewTab }) {
  const navigate = useNavigate();

  async function handleLogout() {
    await axios.get(`${import.meta.env.VITE_API_URL}/fuelStation/logout`, {
      withCredentials: true,
    });
    navigate("/login");
  }

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed left-0 top-0 w-64 h-screen bg-slate-900 text-white flex flex-col p-5 z-50 justify-between"
    >
      {/* PROFILE */}
      <div className="profile">
        <div className="flex flex-col items-center border-b border-white/10 pb-5">
          <FaUserCircle className="text-6xl text-green-400" />
          <h2 className="mt-2 font-semibold text-lg">
            {user?.name || "Fuel Owner"}
          </h2>
          <p className="text-xs text-gray-400">Fuel Station Admin</p>
        </div>

        {/* MENU */}
        <div className="flex flex-col gap-3 mt-6">
          <Link
            onClick={() => setNewTab("stations")}
            to="/fuelStation/profile"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-green-500/20 transition"
          >
            <FaGasPump /> My Fuel Stations
          </Link>

          <Link
            onClick={() => setNewTab("delivery")}
            to="/fuelStation/profile"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-green-500/20 transition"
          >
            <FaTruck /> Delivery Persons
          </Link>
        </div>
      </div>

      {/* LOGOUT */}
      <div className="ml-5 mt-6 flex flex-col gap-3">
        {/* ➕ ADD STATION */}
        <Link
          to="/fuelStation/profile/complete-profile"
          className="
              group flex items-center justify-center gap-2 px-4 py-3 rounded-xl 
              bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold
              shadow-md hover:shadow-lg hover:scale-[1.03] active:scale-95
              transition-all duration-200
                        "
        >
          <span className="text-lg">➕</span>
          Add Fuel Station
        </Link>

        {/* 🚪 LOGOUT */}
        <button
          onClick={handleLogout}
          className="
                group flex items-center justify-center gap-2 px-4 py-3 rounded-xl 
                bg-gradient-to-r from-red-500 to-rose-600 text-white font-semibold
                shadow-md hover:shadow-lg hover:scale-[1.03] active:scale-95
                transition-all duration-200
              "
        >
          <FaSignOutAlt className="group-hover:rotate-12 transition" />
          Logout
        </button>
      </div>
    </motion.aside>
  );
}
