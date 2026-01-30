import { motion } from "framer-motion";
import { FaBolt } from "react-icons/fa";

function SpeedDeliveryBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.05 }}
      className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full
                 bg-gradient-to-r from-yellow-400 to-orange-500
                 text-white font-semibold shadow-lg
                 hover:shadow-orange-500/40 cursor-pointer"
    >
      {/* ⚡ Icon */}
      <motion.span
        animate={{ x: [0, 4, 0] }}
        transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
      >
        <FaBolt className="text-lg" />
      </motion.span>

      {/* 🏎️ Text */}
      <span className="tracking-wide">Speed Delivery</span>
    </motion.div>
  );
}

export default SpeedDeliveryBadge;
