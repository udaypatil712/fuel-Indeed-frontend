import { motion } from "framer-motion";
import {
  Form,
  useNavigation,
  useActionData,
  useNavigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FaCamera,
  FaCheckCircle,
  FaExclamationTriangle,
  FaMapMarkedAlt,
} from "react-icons/fa";
import LocationPicker from "../fuelStationComponents/LocationPicker";

export async function DeliveryRegisterAction({ request }) {
  try {
    const data = await request.formData();

    if (!data.get("image") || data.get("image").size === 0) {
      return { error: "Profile photo is required" };
    }

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/deliveryPerson/completeProfile`,
      {
        method: "POST",
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
    console.error(err);
    return { error: "Network error. Please try again." };
  }
}

export default function CompleteProfile() {
  const navigation = useNavigation();
  const actionData = useActionData();
  const navigate = useNavigate();
  const isSubmitting = navigation.state === "submitting";

  const [preview, setPreview] = useState(null);
  const [stationLocation, setStationLocation] = useState(null);

  useEffect(() => {
    if (actionData?.success) {
      setTimeout(() => {
        navigate("/deliveryPerson/profile");
      }, 1500);
    }
  }, [actionData, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl w-full max-w-5xl overflow-hidden grid grid-cols-1 lg:grid-cols-2"
      >
        {/* 🧾 LEFT - FORM */}
        <div className="p-8 sm:p-10">
          <h2 className="text-3xl font-extrabold text-orange-400 mb-2">
            Complete Your Profile
          </h2>
          <p className="text-gray-400 mb-6">
            This information helps fuel stations assign deliveries to you
            faster.
          </p>

          {/* ❌ ERROR */}
          {actionData?.error && (
            <div className="mb-4 flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg">
              <FaExclamationTriangle />
              {actionData.error}
            </div>
          )}

          {/* ✅ SUCCESS */}
          {actionData?.success && (
            <div className="mb-4 flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-3 rounded-lg">
              <FaCheckCircle />
              {actionData.success}
            </div>
          )}

          <Form
            method="post"
            encType="multipart/form-data"
            className="space-y-5"
          >
            {/* 🧱 GRID INPUTS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input name="city" placeholder="City" />
              <Input name="pincode" placeholder="Pincode" />
            </div>

            <Input name="contact" placeholder="Contact Number" />
            <Input name="address" placeholder="Full Address" />

            {/* 📍 Hidden lat/lng */}
            <input
              type="hidden"
              name="lat"
              value={stationLocation?.lat || ""}
            />
            <input
              type="hidden"
              name="lng"
              value={stationLocation?.lng || ""}
            />

            {/* 🗺 Location Picker */}
            <div className="rounded-xl overflow-hidden border border-white/10">
              <div className="flex items-center gap-2 px-4 py-2 text-sm text-orange-400 bg-black/40">
                <FaMapMarkedAlt /> Select Your Location
              </div>
              <LocationPicker
                onSelect={(loc) => {
                  console.log(loc);
                  setStationLocation(loc);
                }}
              />
            </div>

            {/* 📸 Upload */}
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <label className="flex items-center gap-3 cursor-pointer text-orange-400 font-semibold">
                <FaCamera />
                Upload Profile Photo
                <input
                  type="file"
                  name="image"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) setPreview(URL.createObjectURL(file));
                  }}
                />
              </label>

              {preview && (
                <span className="text-xs text-green-400">✔ Image selected</span>
              )}
            </div>

            {/* 🚀 SUBMIT */}
            <button
              disabled={isSubmitting}
              type="submit"
              className={`w-full py-3 mt-6 rounded-xl font-bold text-lg transition-all duration-300
                ${
                  isSubmitting
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-orange-500 to-amber-500 hover:scale-[1.02] hover:shadow-xl"
                }`}
            >
              {isSubmitting ? "Saving..." : "Save & Continue"}
            </button>
          </Form>
        </div>

        {/* 🖼️ RIGHT - PREVIEW */}
        <div className="bg-black/40 flex flex-col items-center justify-center p-10 gap-6">
          <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-full border-4 border-orange-500 flex items-center justify-center overflow-hidden shadow-2xl">
            {preview ? (
              <img src={preview} className="w-full h-full object-cover" />
            ) : (
              <span className="text-gray-500 text-center px-6">
                Image Preview Will Appear Here
              </span>
            )}
          </div>

          <p className="text-gray-400 text-sm text-center">
            Upload a clear photo. This will be visible to fuel stations.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

/* 🧩 Reusable Input */
function Input({ name, placeholder }) {
  return (
    <input
      name={name}
      required
      placeholder={placeholder}
      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 
      text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
    />
  );
}
