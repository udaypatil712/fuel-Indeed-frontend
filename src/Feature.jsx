import { memo } from "react";
import { motion } from "framer-motion";

const Feature = memo(function Feature({ icon, title, desc }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur h-full text-center sm:text-left"
    >
      <div className="text-4xl text-green-400 mb-4">{icon}</div>

      <h3 className="text-xl font-bold mb-2">{title}</h3>

      <p className="text-gray-400 text-sm">{desc}</p>
    </motion.div>
  );
});

export default Feature;
