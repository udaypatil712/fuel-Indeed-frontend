import { useState, memo } from "react";
import { Form, Link } from "react-router-dom";

const Field = memo(function Field({ label, error, children }) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-300 mb-1.5">
        {label}
      </label>

      {children}

      {error && <p className="text-red-400 text-xs mt-1.5">{error}</p>}
    </div>
  );
});

export default function FormRegister({ errorMessage }) {
  const [role, setRole] = useState("user");

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl">
      {/* Header */}
      <div className="text-center mb-3">
        <h2 className="text-2xl font-bold">Create Account</h2>
        <p className="text-gray-400 mt-1 text-sm">
          Join Fuel Indeed and start booking fuel
        </p>
      </div>

      {errorMessage?.error && (
        <p className="text-red-400 text-sm mb-4 text-center">
          {errorMessage.error}
        </p>
      )}

      <Form method="post" className="space-y-6">
        {/* Full Name */}
        <Field label="Full Name">
          <input
            name="name"
            required
            className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            placeholder="Enter your full name"
          />
        </Field>

        {/* Email */}
        <Field label="Email Address">
          <input
            type="email"
            name="email"
            required
            className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            placeholder="Enter your email"
          />
        </Field>

        {/* Role */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Select Role
          </label>

          <div className="grid grid-cols-3 gap-2">
            {[
              { id: "user", label: "User" },
              { id: "deliveryPerson", label: "Delivery" },
              { id: "fuelStation", label: "Station" },
            ].map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setRole(r.id)}
                className={`py-2 rounded-lg text-sm font-medium border transition ${
                  role === r.id
                    ? "bg-green-500 text-black border-green-500"
                    : "border-white/20 hover:border-green-400 text-gray-300"
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
            className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            placeholder="Create password"
          />
        </Field>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-2.5 rounded-lg font-semibold text-black bg-green-500 hover:bg-green-600 transition"
        >
          Create Account
        </button>
      </Form>

      <p className="text-sm text-gray-400 text-center mt-6">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-green-400 font-semibold hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
