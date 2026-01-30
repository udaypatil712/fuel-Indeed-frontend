import { useState } from "react";
import { Form, Link, redirect, useActionData } from "react-router-dom";
import { motion } from "framer-motion";

export default function FormRegister({ errorMessage }) {
  const [role, setRole] = useState("user");
  return (
    <>
      <div className="flex items-center justify-center px-6 bg-gradient-to-br from-slate-100 via-white to-slate-100">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md rounded-2xl p-8 
          bg-white/80 backdrop-blur-xl 
          border border-gray-200 shadow-2xl
          relative overflow-hidden"
        >
          {/* Subtle accent glow */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-green-400/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl"></div>

          {/* Content */}
          <div className="relative">
            <h2 className="text-3xl font-bold text-gray-900">Create account</h2>
            <p className="text-gray-500 mt-1">
              Get started with Fuel Indeed in seconds.
            </p>

            <Form method="post" className="mt-8 space-y-5">
              {/* Name */}
              <Field label="Full name">
                <input name="name" required className="input" />
              </Field>

              {/* Email */}
              <Field label="Email address">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="eg: test@gmail.com"
                  className="input"
                />
                {errorMessage?.error?.toLowerCase().includes("email") && (
                  <p className="text-red-600 pl-5 font-light">
                    {errorMessage.error}
                  </p>
                )}
              </Field>

              {/* Role */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Choose your role
                </label>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: "user", label: "User" },
                    { id: "deliveryPerson", label: "Delivery" },
                    { id: "fuelStation", label: "FuelStation" },
                  ].map((r) => (
                    <button
                      type="button"
                      key={r.id}
                      onClick={() => setRole(r.id)}
                      className={`p-3 rounded-xl border text-sm font-medium transition ${
                        role === r.id
                          ? "border-green-500 bg-green-50 text-green-700"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>

                <input type="hidden" name="role" value={role} />
              </div>

              {/* Password */}
              <Field label="Password">
                <input
                  type="password"
                  name="password"
                  required
                  className="input"
                />
                {errorMessage?.error?.toLowerCase().includes("password") && (
                  <p className="text-red-600 pl-5 font-light">
                    {errorMessage.error}
                  </p>
                )}
              </Field>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-3 rounded-xl font-semibold text-black
                bg-gradient-to-r from-green-400 to-cyan-400
                hover:scale-[1.02] transition"
              >
                Create account
              </button>
            </Form>

            <p className="text-sm text-center text-gray-600 mt-6">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-green-600 font-semibold hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </>
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
