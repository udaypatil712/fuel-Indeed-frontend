import { Form, Link, useNavigation } from "react-router-dom";
import { memo, useMemo } from "react";

const Field = memo(function Field({ label, error, children }) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-300 mb-2">
        {label}
      </label>

      {children}

      {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
    </div>
  );
});

const FormLogin = memo(function FormLogin({ errorMessage }) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const buttonText = useMemo(() => {
    return isSubmitting ? "Logging in..." : "Login";
  }, [isSubmitting]);

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold">Welcome Back</h2>
        <p className="text-gray-400 mt-2 text-sm">
          Login to your Fuel Indeed account
        </p>
      </div>

      {/* Server Error */}
      {errorMessage?.serverError && (
        <p className="text-red-400 text-sm mb-4 text-center">
          {errorMessage.serverError}
        </p>
      )}

      <Form method="post" className="space-y-6">
        <Field label="Email Address" error={errorMessage?.fieldErrors?.email}>
          <input
            type="email"
            name="email"
            required
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            placeholder="Enter your email"
          />
        </Field>

        <Field label="Password" error={errorMessage?.fieldErrors?.password}>
          <input
            type="password"
            name="password"
            required
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            placeholder="Enter your password"
          />
        </Field>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 rounded-xl font-semibold text-black bg-green-500 hover:bg-green-600 hover:scale-[1.02] transition-all duration-200 disabled:opacity-60"
        >
          {buttonText}
        </button>
      </Form>

      <p className="text-sm text-gray-400 text-center mt-8">
        Don’t have an account?{" "}
        <Link
          to="/register"
          className="text-green-400 font-semibold hover:underline"
        >
          Create one
        </Link>
      </p>
    </div>
  );
});

export default FormLogin;
