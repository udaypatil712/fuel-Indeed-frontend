import { Link } from "react-router-dom";
import Orb from "./Orb";
import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { MdEmail, MdSecurity } from "react-icons/md";

export default function App() {
  return (
    <div
      className="relative min-h-screen text-white overflow-hidden
bg-gradient-to-br 
from-[#020617] 
via-[#020b2e] 
via-[#04153a] 
via-[#041634] 
to-[#0a2a5e]"
    >
      {/* 🌌 GLOBAL STAR BACKGROUND */}
      <div className="fixed inset-0 -z-10">
        <Canvas>
          <Stars
            radius={700}
            depth={90}
            count={8000}
            factor={4}
            fade
            speed={1}
          />
        </Canvas>
      </div>

      {/* ========== HERO SECTION ========== */}
      <section className="min-h-screen grid md:grid-cols-2 items-center px-20">
        {/* LEFT TEXT */}
        <div className="z-10">
          <h1 className="text-6xl font-bold mb-6">
            <span className="text-green-400">Fuel</span> Indeed
          </h1>

          <p className="text-gray-400 mb-10 max-w-xl">
            Next-Gen Smart Fuel Booking Platform for Users, Stations & Delivery.
          </p>

          <div className="flex gap-6">
            <Link
              to="/register"
              className="px-8 py-4 bg-green-500 text-black rounded-xl font-semibold hover:scale-105 transition"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="px-8 py-4 border border-white/20 rounded-xl hover:bg-white/10 transition"
            >
              Login
            </Link>
          </div>
        </div>

        {/* RIGHT 3D */}
        <div className="h-[600px] z-10">
          <Orb />
        </div>
      </section>

      {/* ========== DELIVERY SECTION ========== */}
      <section className="min-h-screen flex items-center px-20">
        <div className="grid md:grid-cols-2 gap-20 items-center w-full">
          {/* LEFT ANIMATED CARD */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="p-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl"
          >
            <div className="text-6xl mb-6">
              <FaLocationDot />
            </div>
            <h3 className="text-3xl font-bold mb-4">Location Based Delivery</h3>
            <p className="text-gray-400">
              We detect your location and show nearby fuel stations. Our
              delivery partners bring fuel directly to your vehicle — anytime,
              anywhere.
            </p>
          </motion.div>

          {/* RIGHT TEXT */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold mb-6">
              Fuel Delivered{" "}
              <span className="text-green-400">To Your Location</span>
            </h2>

            <p className="text-gray-400 text-lg mb-6">
              No more searching for petrol pumps. No more waiting in queues.
              Just open the app, select fuel, and get it delivered.
            </p>

            <ul className="space-y-4 text-gray-300">
              <li className="flex items-center gap-3">
                <IoMdCheckmarkCircle className="text-green-400 text-xl" />
                <span>Live station tracking</span>
              </li>

              <li className="flex items-center gap-3">
                <IoMdCheckmarkCircle className="text-green-400 text-xl" />
                <span>Smart nearby station selection</span>
              </li>

              <li className="flex items-center gap-3">
                <IoMdCheckmarkCircle className="text-green-400 text-xl" />
                <span>Real-time delivery updates</span>
              </li>

              <li className="flex items-center gap-3">
                <IoMdCheckmarkCircle className="text-green-400 text-xl" />
                <span>Secure OTP based delivery</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ========== PAYMENT & EMAIL SECURITY SECTION ========== */}
      <section className="min-h-screen flex items-center px-20">
        <div className="grid md:grid-cols-2 gap-20 items-center w-full">
          {/* LEFT TEXT */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold mb-6">
              Secure Payment with{" "}
              <span className="text-green-400">Email Verification</span>
            </h2>

            <p className="text-gray-400 text-lg mb-6">
              Every transaction is protected using OTP and email verification to
              ensure only you can confirm and receive your fuel delivery.
            </p>

            <ul className="space-y-4 text-gray-300">
              <li className="flex items-center gap-3">
                <IoMdCheckmarkCircle className="text-green-400 text-xl" />
                <span>Email OTP verification before payment</span>
              </li>

              <li className="flex items-center gap-3">
                <IoMdCheckmarkCircle className="text-green-400 text-xl" />
                <span>Secure payment gateway integration</span>
              </li>

              <li className="flex items-center gap-3">
                <IoMdCheckmarkCircle className="text-green-400 text-xl" />
                <span>Order confirmation sent to your email</span>
              </li>

              <li className="flex items-center gap-3">
                <IoMdCheckmarkCircle className="text-green-400 text-xl" />
                <span>Delivery OTP matched before handover</span>
              </li>
            </ul>
          </motion.div>

          {/* RIGHT SECURITY CARD */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="p-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl"
          >
            <div className="flex items-center gap-6 mb-6">
              <div className="text-6xl text-green-400">
                <MdEmail />
              </div>
              <div className="text-6xl text-green-400">
                <MdSecurity />
              </div>
            </div>

            <h3 className="text-3xl font-bold mb-4">Double Layer Security</h3>

            <p className="text-gray-400">
              Your booking is confirmed only after email verification and your
              fuel is delivered only after OTP confirmation. This ensures zero
              fraud, zero mistakes and complete trust.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ========== THIRD SECTION (OPTIONAL TEASER) ========== */}
      <section className="min-h-screen flex items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold mb-6">
            Built for{" "}
            <span className="text-green-400">Speed, Safety & Scale</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A complete ecosystem connecting Users, Fuel Stations and Delivery
            Partners.
          </p>
        </motion.div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="relative border-t border-white/10 bg-black/40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-10 py-16">
          {/* TOP THANK YOU */}
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-3">
              Thank You For Visiting{" "}
              <span className="text-green-400">Fuel Indeed</span> 🚀
            </h3>
            <p className="text-gray-400">
              We appreciate your time. Hope you loved exploring our platform.
            </p>
          </div>

          {/* FOOTER GRID */}
          <div className="grid md:grid-cols-3 gap-10 text-gray-300">
            {/* BRAND */}
            <div>
              <h4 className="text-xl font-semibold mb-4 text-white">
                Fuel Indeed
              </h4>
              <p className="text-gray-400">
                Smart fuel booking & delivery platform connecting Users, Fuel
                Stations and Delivery Partners with speed, security and trust.
              </p>
            </div>

            {/* QUICK LINKS */}
            <div>
              <h4 className="text-xl font-semibold mb-4 text-white">
                Quick Links
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    className="hover:text-green-400 transition"
                    to="/register"
                  >
                    Get Started
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-green-400 transition" to="/login">
                    Login
                  </Link>
                </li>
                <li>
                  <span className="hover:text-green-400 transition cursor-pointer">
                    Features
                  </span>
                </li>
                <li>
                  <span className="hover:text-green-400 transition cursor-pointer">
                    About
                  </span>
                </li>
              </ul>
            </div>

            {/* MESSAGE */}
            <div>
              <h4 className="text-xl font-semibold mb-4 text-white">Message</h4>
              <p className="text-gray-400">
                This project is built with ❤️ to make fuel delivery smarter,
                safer and faster for everyone.
              </p>
            </div>
          </div>

          {/* BOTTOM BAR */}
          <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
            <p>
              © {new Date().getFullYear()} Fuel Indeed. All rights reserved.
            </p>
            <p className="flex items-center gap-2 mt-2 md:mt-0">
              Made with <FaHeart className="text-red-500" /> by Uday Patil
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
