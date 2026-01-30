import { Form, Link, redirect, useActionData } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { useState } from "react";
import FormRegister from "./FormRegister";

export async function RegisterAction({ request }) {
  const data = await request.formData();
  const jsonData = Object.fromEntries(data);

  try {
    await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/register`,
      jsonData,
      {
        withCredentials: true,
      },
    );
    return redirect("/login");
  } catch (error) {
    // console.log("ACTION ERROR:", error.response?.data);

    // ✅ Just return plain object
    return {
      error: error.response?.data?.message || "Something went wrong",
    };
  }
}

export default function Register() {
  const errorMessage = useActionData();

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div className="hidden md:flex flex-col justify-center px-20 bg-black text-white">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl font-bold mb-6">
            <span className="text-green-400">Fuel</span> Indeed
          </h1>

          <p className="text-xl text-gray-400 max-w-md">
            Smart fuel booking and delivery platform built for speed, safety and
            convenience.
          </p>

          <div className="mt-12 space-y-4 text-gray-300">
            <p>✅ Location based fuel delivery</p>
            <p>✅ Real-time order tracking</p>
            <p>✅ Secure OTP verification</p>
            <p>✅ Built for users, stations & delivery partners</p>
          </div>
        </motion.div>
      </div>

      <FormRegister errorMessage={errorMessage} />
    </div>
  );
}
