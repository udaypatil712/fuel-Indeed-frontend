import { motion } from "framer-motion";
import {
  Form,
  useNavigation,
  useActionData,
  useNavigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { FaCamera, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

export async function DeliveryUpdateAction({ request }) {
  try {
    const data = await request.formData();

    // 🛑 Frontend validation (optional but good UX)
    const contact = data.get("contact");
    const pincode = data.get("pincode");

    if (contact && !/^\d{10}$/.test(contact)) {
      return { error: "Contact number must be 10 digits" };
    }

    if (pincode && !/^\d{6}$/.test(pincode)) {
      return { error: "Pincode must be 6 digits" };
    }

    const image = data.get("image");
    if (image && image.size > 0 && !image.type.startsWith("image/")) {
      return { error: "Only image files are allowed" };
    }

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/deliveryPerson/updateProfile`,
      {
        method: "PATCH",
        body: data,
        credentials: "include",
      },
    );

    const result = await res.json();

    if (!res.ok) {
      return { error: result.message || "Profile update failed" };
    }

    return { success: result.message };
  } catch (err) {
   // console.error(err);
    return { error: "Network error. Please check your internet connection." };
  }
}

export default function UpdateProfile() {
  const navigation = useNavigation();
  const actionData = useActionData();
  const navigate = useNavigate();

  const isSubmitting = navigation.state === "submitting";

  const [preview, setPreview] = useState(null);

  // 🧭 Redirect after success
  useEffect(() => {
    if (actionData?.success) {
      setTimeout(() => {
        navigate("/deliveryPerson/profile");
      }, 1500);
    }
  }, [actionData, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black flex items-center justify-center text-white">
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl w-[900px] overflow-hidden grid grid-cols-1 md:grid-cols-2"
      >
        {/* 🎨 LEFT PANEL */}
        <div className="p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-orange-400 mb-3">
            Update Your Delivery Profile
          </h2>
          <p className="text-gray-400 mb-6">
            Keep your information updated for smooth deliveries.
          </p>

          {/* 🔴 ERROR MESSAGE */}
          {actionData?.error && (
            <div className="mb-4 flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg">
              <FaExclamationTriangle />
              {actionData.error}
            </div>
          )}

          {/* 🟢 SUCCESS MESSAGE */}
          {actionData?.success && (
            <div className="mb-4 flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-3 rounded-lg">
              <FaCheckCircle />
              {actionData.success}
            </div>
          )}

          <Form
            method="post"
            encType="multipart/form-data"
            className="space-y-4"
          >
            <input name="city" className="input" placeholder="City" />
            <input
              name="contact"
              className="input"
              placeholder="Contact Number"
            />
            <input
              name="address"
              className="input"
              placeholder="Full Address"
            />
            <input name="pincode" className="input" placeholder="Pincode" />

            {/* 📸 FILE INPUT */}
            <label className="flex items-center gap-3 cursor-pointer text-orange-400">
              <FaCamera />
              Change Profile Photo
              <input
                type="file"
                name="image"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setPreview(URL.createObjectURL(file));
                  }
                }}
              />
            </label>

            <button
              disabled={isSubmitting}
              type="submit"
              className={`w-full py-3 mt-4 rounded-xl font-semibold text-lg transition ${
                isSubmitting
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600"
              }`}
            >
              {isSubmitting ? "Saving..." : "Update Profile"}
            </button>
          </Form>
        </div>

        {/* 🖼️ RIGHT PANEL */}
        <div className="bg-black/40 flex items-center justify-center p-10">
          <div className="w-60 h-60 rounded-full border-4 border-orange-500 flex items-center justify-center overflow-hidden">
            {preview ? (
              <img src={preview} className="w-full h-full object-cover" />
            ) : (
              <span className="text-gray-500 text-center">
                Current Image Preview
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
