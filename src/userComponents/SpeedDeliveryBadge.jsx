import { motion } from "framer-motion";
import { FaBolt } from "react-icons/fa";

export default function SpeedDeliveryBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -15 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      className="
        flex items-center gap-1 sm:gap-2
        px-2.5 sm:px-4 py-1.5 sm:py-2
        rounded-full
        bg-gradient-to-r from-yellow-400 to-orange-500
        text-white font-semibold shadow-md
        hover:shadow-orange-500/40
        cursor-pointer
        text-xs sm:text-sm
        whitespace-nowrap
      "
    >
      {/* Icon */}
      <motion.span
        animate={{ x: [0, 4, 0] }}
        transition={{ repeat: Infinity, duration: 1 }}
      >
        <FaBolt className="text-sm sm:text-lg" />
      </motion.span>

      {/* Text */}
      <span className="hidden xs:inline sm:inline">Speed Delivery</span>
    </motion.div>
  );
}
