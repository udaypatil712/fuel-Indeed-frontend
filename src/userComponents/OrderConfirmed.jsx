import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCheckCircle, FaGasPump } from "react-icons/fa";

export default function OrderConfirmed() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return null;

  return (
    <div
      className="relative min-h-screen flex items-center justify-center overflow-hidden 
      bg-gradient-to-br from-[#0f172a] via-[#020617] to-[#1e1b4b]"
    >
      {/* 🌌 Soft animated lights */}
      <motion.div
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-120px] left-[-120px] w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-3xl"
      />

      <motion.div
        animate={{ x: [0, -60, 0], y: [0, -40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-120px] right-[-120px] w-[400px] h-[400px] bg-violet-500/10 rounded-full blur-3xl"
      />

      {/* 💎 Glass Card */}
      <motion.div
        initial={{ opacity: 0, y: 80, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
        className="relative z-10 backdrop-blur-xl bg-white/10 border border-white/20 
        rounded-3xl shadow-2xl p-8 w-[360px] text-center text-white"
      >
        {/* ✅ Check icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 12 }}
          className="text-7xl flex justify-center text-cyan-400 drop-shadow-lg"
        >
          <FaCheckCircle />
        </motion.div>

        <h1 className="text-3xl font-bold mt-4">Payment Successful</h1>

        <p className="mt-2 text-white/70">Your order has been confirmed</p>

        {/* 📦 Order Card */}
        <div className="mt-6 bg-white/10 rounded-2xl p-4 text-left backdrop-blur-md border border-white/10">
          <p className="font-semibold text-lg mb-2 flex items-center gap-2 text-cyan-300">
            <FaGasPump /> {state.stationName}
          </p>

          <div className="text-sm space-y-1 text-white/80">
            <p>
              Fuel Type:{" "}
              <span className="font-semibold text-white">
                {state.booking.fuelType}
              </span>
            </p>
            <p>
              Quantity:{" "}
              <span className="font-semibold text-white">
                {state.booking.litres} L
              </span>
            </p>
            <p className="text-lg font-bold pt-2 text-cyan-300">
              Total: ₹{state.booking.total}
            </p>
          </div>
        </div>

        {/* 🚀 Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/user/profile")}
          className="mt-6 w-full py-3 rounded-xl 
          bg-gradient-to-r from-cyan-500 to-blue-600 
          hover:from-cyan-400 hover:to-blue-500 
          text-black font-semibold shadow-lg"
        >
          Go to Dashboard
        </motion.button>
      </motion.div>
    </div>
  );
}
