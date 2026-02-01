import { Link } from "react-router-dom";
import Orb from "./Orb";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { motion } from "framer-motion";

import { FaHeart, FaWhatsapp, FaGooglePay } from "react-icons/fa6";

import { MdEmail, MdSecurity, MdPayment, MdGpsFixed } from "react-icons/md";
import AnimatedGrid from "./AnimationGrid";
import RotatingFrame from "./AnimationGrid";

export default function App() {
  return (
    <div className="relative min-h-screen text-white overflow-x-hidden bg-gradient-to-br from-[#020617] via-[#04153a] to-[#0a2a5e]">
      {/* 🌌 GLOBAL BACKGROUND */}
      <div className="fixed inset-0 -z-10">
        <Canvas className="w-full h-full">
          <Stars radius={400} depth={60} count={2000} factor={2} fade />
        </Canvas>
      </div>

      {/* ================= HERO ================= */}
      <section
        className="
  min-h-[100svh]
  lg:min-h-screen
  grid
  lg:grid-cols-2
  items-center
  px-4 sm:px-6 md:px-12 lg:px-24
  gap-10
"
      >
        {/* LEFT TEXT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left"
        >
          <h1 className="font-bold mb-6 text-4xl sm:text-5xl xl:text-6xl">
            <span className="text-green-400">Fuel</span> Indeed
          </h1>

          <p className="text-gray-300 mb-8 text-base sm:text-lg">
            India’s Smart Fuel Booking & Delivery Platform with Real-Time
            Tracking, Secure Payments & Live Notifications.
          </p>

          {/* TAGS */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8">
            {[
              "Live Location",
              "Google Maps",
              "WhatsApp Alerts",
              "Razorpay",
              "Email OTP",
              "Instant Delivery",
            ].map((tag, i) => (
              <span
                key={i}
                className="px-3 sm:px-4 py-1 bg-white/10 rounded-full text-xs sm:text-sm border border-white/10"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* BUTTONS */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-4">
            <Link
              to="/register"
              className="px-6 sm:px-8 py-3 bg-green-500 text-black rounded-xl font-semibold hover:scale-105 transition"
            >
              Start Booking
            </Link>

            <Link
              to="/login"
              className="px-6 sm:px-8 py-3 border border-white/20 rounded-xl hover:bg-white/10 transition"
            >
              Login
            </Link>
          </div>
        </motion.div>

        {/* RIGHT ORB */}
        {/* RIGHT ORB */}
        <div
          className="
    relative
    w-full
    flex
    items-center
    justify-center

    h-[300px]
    sm:h-[360px]
    md:h-[440px]
    lg:h-[580px]
    xl:h-[680px]

    overflow-hidden
  "
        >
          <Orb />
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl xl:text-5xl font-bold text-center mb-16">
          Powerful Platform <span className="text-green-400">Features</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <Feature
            icon={<MdGpsFixed />}
            title="Live GPS Tracking"
            desc="Track delivery partner in real-time using Google Maps."
          />

          <Feature
            icon={<FaWhatsapp />}
            title="WhatsApp Alerts"
            desc="Instant updates via WhatsApp."
          />

          <Feature
            icon={<MdEmail />}
            title="Email Verification"
            desc="OTP based verification system."
          />

          <Feature
            icon={<MdPayment />}
            title="Razorpay Payments"
            desc="Secure online payment gateway."
          />

          <Feature
            icon={<MdSecurity />}
            title="OTP Delivery"
            desc="Delivery only after OTP match."
          />

          <Feature
            icon={<FaGooglePay />}
            title="UPI & Cards"
            desc="Multiple payment methods supported."
          />
        </div>
      </section>

      <section className="relative min-h-[75vh] flex items-center justify-center text-center px-6 overflow-hidden">
        {/* Top Left Frame */}
        <div className="absolute top-6 left-6 sm:top-12 sm:left-12 lg:top-16 lg:left-24 opacity-20">
          <RotatingFrame />
        </div>

        {/* Top Right Frame */}
        <div className="absolute top-6 right-6 sm:top-12 sm:right-12 lg:top-16 lg:right-24 opacity-20">
          <RotatingFrame />
        </div>

        {/* CTA Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-xl"
        >
          <h2 className="text-3xl sm:text-4xl xl:text-5xl font-bold mb-6">
            Book Fuel in <span className="text-green-400">Seconds</span>
          </h2>

          <p className="text-gray-400 mb-8">
            Safe, fast and verified fuel delivery.
          </p>

          <Link
            to="/register"
            className="px-8 sm:px-10 py-4 bg-green-500 text-black rounded-xl font-semibold"
          >
            Get Started Now
          </Link>
        </motion.div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/10 bg-black/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-10 text-center md:text-left">
            <div>
              <h4 className="text-xl font-bold mb-3">Fuel Indeed</h4>
              <p className="text-gray-400">Smart fuel delivery system.</p>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-3">Quick Links</h4>

              <ul className="space-y-2">
                <li>
                  <Link to="/register">Register</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-3">Developer</h4>
              <p className="text-gray-400">Built with ❤️ by Uday Patil</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-3">
            <p>© {new Date().getFullYear()} Fuel Indeed</p>

            <p className="flex items-center gap-2">
              Made with <FaHeart className="text-red-500" /> in India
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ================= FEATURE CARD ================= */

function Feature({ icon, title, desc }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="
        p-6
        rounded-2xl
        bg-white/5
        border
        border-white/10
        backdrop-blur
        h-full
        text-center sm:text-left
      "
    >
      <div className="text-4xl text-green-400 mb-4">{icon}</div>

      <h3 className="text-xl font-bold mb-2">{title}</h3>

      <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
    </motion.div>
  );
}
