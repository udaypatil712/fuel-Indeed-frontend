import { redirect, useActionData, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { memo } from "react";
import FormLogin from "./FormLogin";

/* ================= ACTION ================= */

export async function LoginAction({ request }) {
  const formData = await request.formData();
  const jsonData = Object.fromEntries(formData);

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
      { withCredentials: true },
    );

    const { role } = res.data;
    return redirect(`/${role}/profile`);
  } catch (error) {
    return {
      serverError:
        error.response?.data?.message ||
        "Server not responding. Try again later.",
    };
  }
}

/* ================= COMPONENT ================= */

const Login = memo(function Login() {
  const errorMessage = useActionData();

  return (
    <div className="min-h-screen bg-[#0B1220] text-white flex flex-col">
      {/* NAVBAR */}
      <header className="flex justify-between items-center px-6 sm:px-10 lg:px-16 py-6 border-b border-white/10">
        <Link to="/" className="text-2xl font-bold text-green-400">
          Fuel Indeed
        </Link>

        <Link
          to="/register"
          className="px-4 sm:px-6 py-2 bg-green-500 text-black rounded-xl font-semibold hover:bg-green-600 transition text-sm sm:text-base"
        >
          Register
        </Link>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex flex-1 items-center justify-center px-4 sm:px-6 py-12 relative">
        {/* Background Glow */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"></div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md relative z-10"
        >
          <FormLogin errorMessage={errorMessage} />
        </motion.div>
      </main>
    </div>
  );
});

export default Login;
