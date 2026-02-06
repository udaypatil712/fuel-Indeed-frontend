import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

import ShowFuelStations from "./ShowFuelStations";
import ShowDeliveryPersons from "./ShowDeliveryPersons";

import { Menu, X, LogOut, Settings } from "lucide-react";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("stations");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  /* ================= LOGOUT ================= */

  async function adminLogout() {
    try {
      await axios.get(`${import.meta.env.VITE_API_URL}/admin/logout`, {
        withCredentials: true,
      });

      navigate("/login");
    } catch {
      alert("Logout failed");
    }
  }

  /* ================= SIDEBAR ================= */

  const Sidebar = () => (
    <aside className=" w-64 h-screen md:w-72 bg-black/70 backdrop-blur-xl text-white flex flex-col border-r border-white/10">
      {/* Header */}
      <div className="p-5 text-xl font-bold border-b border-white/10 text-cyan-400">
        🛡️ Admin Panel
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-3">
        {[
          { id: "stations", label: "⛽ Station Requests" },
          { id: "delivery", label: "🚚 Delivery Persons" },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveTab(item.id);
              setSidebarOpen(false);
            }}
            className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition ${
              activeTab === item.id
                ? "bg-gradient-to-r from-green-400 to-emerald-500 text-black shadow-lg"
                : "hover:bg-white/10"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* Actions */}
      <div className="p-4 border-t border-white/10 space-y-3">
        <button
          onClick={() => navigate("/admin/profile/complete-profile")}
          className="w-full py-3 rounded-xl bg-cyan-500 text-black font-semibold hover:bg-cyan-600 transition flex items-center justify-center gap-2"
        >
          <Settings size={18} /> Update Fuel Stock
        </button>

        <button
          onClick={adminLogout}
          className="w-full py-3 rounded-xl bg-red-500 hover:bg-red-600 transition font-semibold flex items-center justify-center gap-2"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </aside>
  );

  /* ================= UI ================= */

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#0f172a] via-[#020617] to-[#020617]">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-between px-4 py-3 border-b border-white/10">
        <h2 className="text-cyan-400 font-bold">Admin Panel</h2>

        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="fixed inset-y-0 left-0 z-40 md:hidden"
          >
            <Sidebar />
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN */}
      <main className="flex-1 pt-16 md:pt-0 p-4 md:p-8 overflow-y-auto ">
        <AnimatePresence mode="wait">
          {activeTab === "stations" && (
            <motion.div
              key="stations"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <ShowFuelStations />
            </motion.div>
          )}

          {activeTab === "delivery" && (
            <motion.div
              key="delivery"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <ShowDeliveryPersons />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
