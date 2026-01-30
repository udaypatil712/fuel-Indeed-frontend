import { Form, Link, useActionData, useNavigation } from "react-router-dom";
import { motion } from "framer-motion";

export default function FormLogin({ errorMessage }) {
  // const actionData = useActionData();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="flex items-center justify-center px-6 bg-gradient-to-br from-slate-100 via-white to-slate-100 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md rounded-2xl p-8 
        bg-white/80 backdrop-blur-xl 
        border border-gray-200 shadow-2xl
        relative overflow-hidden"
      >
        {/* Glow */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-green-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl"></div>

        <div className="relative">
          <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
          <p className="text-gray-500 mt-1">
            Login to your Fuel Indeed account.
          </p>

          {/* 🔴 Server Error */}
          {errorMessage?.serverError && (
            <p className="text-red-600 text-center mt-4">
              {errorMessage.serverError}
            </p>
          )}

          <Form method="post" className="mt-8 space-y-5">
            {/* Email */}
            <Field label="Email address">
              <input
                type="email"
                name="email"
                className="input"
                placeholder="eg: test@gmail.com"
                required
              />
              {errorMessage?.fieldErrors?.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errorMessage.fieldErrors.email}
                </p>
              )}
            </Field>

            {/* Password */}
            <Field label="Password">
              <input
                type="password"
                name="password"
                className="input"
                required
              />
              {errorMessage?.fieldErrors?.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errorMessage.fieldErrors.password}
                </p>
              )}
            </Field>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl font-semibold text-black
              bg-gradient-to-r from-green-400 to-cyan-400
              hover:scale-[1.02] transition disabled:opacity-60"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </Form>

          <p className="text-sm text-center text-gray-600 mt-6">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-green-600 font-semibold hover:underline"
            >
              Create one
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      {children}
    </div>
  );
}
