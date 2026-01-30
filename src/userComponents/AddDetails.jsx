import { Form, useActionData } from "react-router-dom";
import axios from "axios";
import { redirect } from "react-router-dom";

export async function CompleteProfileAction({ request }) {
  const data = await request.formData();
  const formData = Object.fromEntries(data);

  try {
    await axios.post(
      `${import.meta.env.VITE_API_URL}/user/complete-profile`,
      formData,
      {
        withCredentials: true,
      },
    );

    return redirect("/user/profile");
  } catch (err) {
    return err.response?.data || { message: "Profile completion failed" };
  }
}

export default function AddDetails() {
  const error = useActionData();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center">
          Complete Your Profile
        </h2>
        <p className="text-gray-500 text-center mt-2">
          Please fill in your details
        </p>

        {error?.message && (
          <p className="text-red-500 text-center mt-4">{error.message}</p>
        )}

        <Form method="post" className="mt-8 space-y-5">
          <input
            type="text"
            name="city"
            placeholder="City"
            required
            className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <input
            type="text"
            name="contact"
            placeholder="Contact Number"
            required
            className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <textarea
            name="address"
            placeholder="Full Address"
            required
            rows={3}
            className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
          />

          <input
            type="number"
            name="pincode"
            placeholder="Pincode"
            required
            className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-xl text-white font-semibold
            bg-gradient-to-r from-indigo-600 to-purple-600
            hover:scale-[1.02] transition-transform"
          >
            Submit Details
          </button>
        </Form>
      </div>
    </div>
  );
}
