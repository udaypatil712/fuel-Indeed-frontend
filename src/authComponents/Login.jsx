import { Form, Link, redirect, useActionData } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import FormLogin from "./FormLogin";

export async function LoginAction({ request }) {
  const formData = await request.formData();
  const jsonData = Object.fromEntries(formData);

  // Frontend validation
  const fieldErrors = {};
  if (!jsonData.email) fieldErrors.email = "Email is required";
  if (!jsonData.password) fieldErrors.password = "Password is required";

  if (Object.keys(fieldErrors).length > 0) {
    return { fieldErrors };
  }

  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/login`,
      jsonData,
      {
        withCredentials: true,
      },
    );

    const { role } = res.data;

    return redirect(`/${role}/profile`);
  } catch (error) {
    if (error.response) {
      return {
        serverError: error.response.data?.message || "Login failed",
      };
    }

    return {
      serverError: "Server not responding. Try again later.",
    };
  }
}

export default function Login() {
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
            Welcome back. Login to manage your fuel bookings, deliveries and
            dashboard.
          </p>

          <div className="mt-12 space-y-4 text-gray-300">
            <p>✅ Track your orders in real-time</p>
            <p>✅ Manage your profile & bookings</p>
            <p>✅ Secure login system</p>
            <p>✅ Built for users, stations & delivery partners</p>
          </div>
        </motion.div>
      </div>

      <FormLogin errorMessage={errorMessage} />
    </div>
  );
}
