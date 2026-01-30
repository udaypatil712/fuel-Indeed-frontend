import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import ShowFuelStations from "./ShowFuelStations";
import ShowDeliveryPersons from "./ShowDeliveryPersons";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("stations");

  async function adminLogout() {
    try {
      await axios.get(`${import.meta.env.VITE_API_URL}/admin/logout`, {
        withCredentials: true,
      });
      navigate("/login");
    } catch (err) {
      alert("Logout failed");
    }
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#0f172a] via-[#020617] to-[#020617]">
      {/* SIDEBAR */}
      <aside className="w-64 md:w-80 bg-black/60 backdrop-blur-xl text-white flex flex-col border-r border-white/10">
        <div className="p-6 text-xl md:text-2xl font-bold border-b border-white/10 text-cyan-400">
          🛡️ Admin Dashboard
        </div>

        <nav className="flex-1 p-4 space-y-3">
          {[
            { id: "stations", label: "⛽ Station Requests" },
            { id: "delivery", label: "🚚 Delivery Persons" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all font-semibold ${
                activeTab === item.id
                  ? "bg-gradient-to-r from-green-400 to-emerald-500 text-black shadow-lg scale-[1.02]"
                  : "hover:bg-white/10"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-3">
          <button
            onClick={() => navigate("/admin/profile/complete-profile")}
            className="w-full py-3 rounded-xl bg-cyan-500 text-black font-semibold hover:bg-cyan-600 transition"
          >
            ⚙️ Add / Update Fuel Stock
          </button>

          <button
            onClick={adminLogout}
            className="w-full py-3 rounded-xl bg-red-500 hover:bg-red-600 transition font-semibold"
          >
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
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
