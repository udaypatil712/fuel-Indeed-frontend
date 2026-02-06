import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaGasPump,
  FaTruck,
  FaSignOutAlt,
  FaUserCircle,
  FaTimes,
} from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Sidebar({ user, setNewTab, open, setOpen }) {
  const navigate = useNavigate();

  const [isDesktop, setIsDesktop] = useState(
    window.innerWidth >= 1024
  );


  /* ================= RESPONSIVE DETECT ================= */

  useEffect(() => {
    function handleResize() {
      setIsDesktop(window.innerWidth >= 1024);
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);


  /* ================= LOGOUT ================= */

  async function handleLogout() {
    await axios.get(`${import.meta.env.VITE_API_URL}/fuelStation/logout`, {
      withCredentials: true,
    });

    navigate("/login");
  }


  /* ================= POSITION ================= */

  const sidebarX = isDesktop ? 0 : open ? 0 : -260;


  return (
    <AnimatePresence>

      {/* OVERLAY (MOBILE ONLY) */}
      {!isDesktop && open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black z-40"
        />
      )}


      {/* SIDEBAR */}
      <motion.aside
        initial={{ x: -260 }}
        animate={{ x: sidebarX }}
        exit={{ x: -260 }}
        transition={{ duration: 0.3 }}
        className="
          fixed left-0 top-0 h-screen w-64
          bg-slate-900 text-white

          flex flex-col justify-between

          p-4 sm:p-5
          z-50
          overflow-y-auto
        "
      >

        {/* CLOSE (MOBILE) */}
        {!isDesktop && (
          <button
            onClick={() => setOpen(false)}
            className="absolute top-3 right-3 p-2"
          >
            <FaTimes />
          </button>
        )}


        {/* PROFILE */}
        <div>

          <div className="flex flex-col items-center border-b border-white/10 pb-5">

            <FaUserCircle className="text-6xl text-green-400" />

            <h2 className="mt-3 font-semibold text-lg text-center truncate w-full">
              {user?.name || "Fuel Owner"}
            </h2>

            <p className="text-xs text-gray-400">
              Fuel Station Admin
            </p>

          </div>


          {/* MENU */}
          <nav className="flex flex-col gap-2 mt-6">

            <Link
              onClick={() => {
                setNewTab("stations");
                if (!isDesktop) setOpen(false);
              }}
              to="/fuelStation/profile"
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-green-500/20 transition"
            >
              <FaGasPump />
              My Fuel Stations
            </Link>


            <Link
              onClick={() => {
                setNewTab("delivery");
                if (!isDesktop) setOpen(false);
              }}
              to="/fuelStation/profile"
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-green-500/20 transition"
            >
              <FaTruck />
              Delivery Persons
            </Link>

          </nav>

        </div>


        {/* FOOTER */}
        <div className="flex flex-col gap-3 pt-4 border-t border-white/10">

          <Link
            to="/fuelStation/profile/complete-profile"
            onClick={() => !isDesktop && setOpen(false)}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl 
            bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold"
          >
            ➕ Add Fuel Station
          </Link>


          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl 
            bg-gradient-to-r from-red-500 to-rose-600 text-white font-semibold"
          >
            <FaSignOutAlt />
            Logout
          </button>

        </div>

      </motion.aside>
    </AnimatePresence>
  );
}
