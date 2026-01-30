import { Link, useRouteError } from "react-router-dom";
import { motion } from "framer-motion";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-black to-slate-900 text-white px-6">
      {/* Background glow */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-green-400/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl"></div>

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-xl text-center"
      >
        {/* Error Code */}
        <h1 className="text-8xl font-extrabold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
          {error?.status || "404"}
        </h1>

        {/* Title */}
        <h2 className="text-3xl font-bold mt-4">Oops! Something went wrong</h2>

        {/* Message */}
        <p className="text-gray-400 mt-4">
          {error?.statusText ||
            error?.message ||
            "The page you are looking for does not exist or has been moved."}
        </p>

        {/* Actions */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/"
            className="px-8 py-3 rounded-xl font-semibold text-black
            bg-gradient-to-r from-green-400 to-cyan-400
            hover:scale-[1.05] transition"
          >
            ⬅ Go Home
          </Link>

          <button
            onClick={() => window.location.reload()}
            className="px-8 py-3 rounded-xl border border-white/20 hover:bg-white/10 transition"
          >
            🔄 Reload Page
          </button>
        </div>

        {/* Brand */}
        <p className="mt-12 text-sm text-gray-500">
          © {new Date().getFullYear()} Fuel Indeed
        </p>
      </motion.div>
    </div>
  );
}
