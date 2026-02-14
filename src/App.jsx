import { motion } from "framer-motion";
import {
  MdSecurity,
  MdPayment,
  MdLocalGasStation,
  MdOutlineSpeed,
} from "react-icons/md";
import { FaWhatsapp, FaMapMarkedAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import deliveryImg from "./assets/delivery.svg";
import trackingImg from "./assets/tracking.svg";

export default function App() {
  return (
    <div className="min-h-screen bg-[#0B1220] text-white overflow-x-hidden">

      {/* ================= NAVBAR ================= */}
      <header className="flex justify-between items-center px-4 sm:px-6 md:px-12 lg:px-20 py-4 sm:py-6">
        <h1 className="text-xl sm:text-2xl font-bold text-green-500">
          Fuel Indeed
        </h1>

        <div className="flex gap-2 sm:gap-4">
          <Link
            to="/login"
            className="px-4 sm:px-5 py-2 border border-white/20 rounded-xl hover:bg-white/10 transition text-xs sm:text-sm md:text-base"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-4 sm:px-5 py-2 bg-green-500 text-black rounded-xl font-semibold hover:bg-green-600 transition text-xs sm:text-sm md:text-base"
          >
            Register
          </Link>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="min-h-[85vh] flex items-center px-4 sm:px-6 md:px-12 lg:px-20 py-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center w-full">

          {/* LEFT TEXT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Smart Fuel Delivery
              <span className="text-green-500 block">
                At Your Location
              </span>
            </h1>

            <p className="text-gray-400 text-sm sm:text-base md:text-lg mb-8 max-w-xl mx-auto lg:mx-0">
              Fuel Indeed delivers petrol and diesel directly to your vehicle.
              Track in real-time, pay securely, and enjoy safe fuel service
              wherever you are.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/register"
                className="bg-green-500 hover:bg-green-600 text-black font-semibold px-8 py-3 rounded-xl transition"
              >
                Get Started
              </Link>

              <Link
                to="/login"
                className="border border-white/20 px-8 py-3 rounded-xl hover:bg-white/10 transition"
              >
                Login
              </Link>
            </div>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center order-first lg:order-last"
          >
            <img
              src={deliveryImg}
              alt="Fuel Delivery Illustration"
              className="w-full max-w-xs sm:max-w-sm md:max-w-md"
            />
          </motion.div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-12 lg:px-20 bg-[#111827]">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          <div className="order-last lg:order-first">
            <img
              src={trackingImg}
              alt="Live Tracking"
              className="w-full max-w-xs sm:max-w-sm mx-auto"
            />
          </div>

          <div className="text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
              Track Fuel Delivery
              <span className="text-green-500"> Live</span>
            </h2>

            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              Track your delivery partner like ride-hailing apps. Get ETA,
              notifications, and OTP confirmation for secure delivery.
            </p>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-12 lg:px-20">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12 sm:mb-16">
          How It <span className="text-green-500">Works</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
          {[
            "Register & Verify",
            "Enter Location",
            "Pay Securely",
            "Track & Receive",
          ].map((step, index) => (
            <div
              key={index}
              className="p-5 sm:p-6 bg-white/5 rounded-2xl border border-white/10 hover:scale-105 transition"
            >
              <div className="text-2xl sm:text-3xl text-green-500 font-bold mb-3">
                {index + 1}
              </div>
              <p className="text-gray-300 text-sm sm:text-base">
                {step}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-12 lg:px-20 bg-[#111827]">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12 sm:mb-16">
          Platform <span className="text-green-500">Features</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[
            { icon: <FaMapMarkedAlt />, title: "Live GPS Tracking" },
            { icon: <MdPayment />, title: "Secure Payments" },
            { icon: <MdSecurity />, title: "OTP Verification" },
            { icon: <FaWhatsapp />, title: "WhatsApp Alerts" },
            { icon: <MdLocalGasStation />, title: "Doorstep Delivery" },
            { icon: <MdOutlineSpeed />, title: "Fast Service" },
          ].map((feature, i) => (
            <div
              key={i}
              className="p-5 sm:p-6 bg-white/5 rounded-2xl border border-white/10 hover:scale-105 transition text-center"
            >
              <div className="text-2xl sm:text-3xl text-green-500 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-base sm:text-lg font-bold">
                {feature.title}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-16 sm:py-24 text-center px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
          Never Run Out of Fuel Again
        </h2>

        <Link
          to="/register"
          className="bg-green-500 text-black px-8 sm:px-10 py-3 sm:py-4 rounded-xl font-semibold hover:bg-green-600 transition"
        >
          Create Free Account
        </Link>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#111827] border-t border-white/10 py-8 sm:py-10 text-center text-gray-400 px-4">
        <p className="text-base sm:text-lg font-semibold text-white mb-2">
          Fuel Indeed
        </p>
        <p className="text-sm sm:text-base">
          India’s Smart Fuel Delivery Platform
        </p>
        <p className="mt-4 text-xs sm:text-sm">
          © {new Date().getFullYear()} Fuel Indeed. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
