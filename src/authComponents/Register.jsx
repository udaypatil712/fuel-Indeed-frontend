import { redirect, useActionData, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import FormRegister from "./FormRegister";

export async function RegisterAction({ request }) {
  const data = await request.formData();
  const jsonData = Object.fromEntries(data);

  try {
    await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/register`,
      jsonData,
      { withCredentials: true },
    );

    return redirect("/login");
  } catch (error) {
    return {
      error: error.response?.data?.message || "Something went wrong",
    };
  }
}

export default function Register() {
  const errorMessage = useActionData();

  return (
    <div className="min-h-screen bg-[#0B1220] text-white flex flex-col">
      {/* NAVBAR */}
      <header className="flex justify-between items-center px-6 sm:px-10 lg:px-16 py-6 border-b border-white/10">
        <Link to="/" className="text-2xl font-bold text-green-400">
          Fuel Indeed
        </Link>

        <Link
          to="/login"
          className="px-4 sm:px-6 py-2 border border-white/20 rounded-xl hover:bg-white/10 transition text-sm sm:text-base"
        >
          Login
        </Link>
      </header>

      {/* MAIN */}
      <main className="flex flex-1 items-center justify-center px-4 sm:px-6 py-12 relative">
        {/* Background Glow */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"></div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}  
          transition={{ duration: 0.6 }}
          className="w-full mt-[-20px] max-w-lg relative z-10"
        >
          <FormRegister errorMessage={errorMessage} />
        </motion.div>
      </main>
    </div>
  );
}
