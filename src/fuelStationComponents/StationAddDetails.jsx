import { redirect, Form, useActionData } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import LocationPicker from "./LocationPicker";

export async function CompleteFuelStationAction({ request }) {
  const data = await request.formData();

  // Debug
  // for (let pair of data.entries()) {
  //   console.log(pair[0], pair[1]);
  // }

  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/fuelStation/complete-profile`,
      {
        method: "POST",
        body: data,
        credentials: "include",
      },
    );

    if (!res.ok) {
      const errData = await res.json();
      return errData;
    }

    return redirect("/fuelStation/profile");
  } catch (err) {
    return { message: "Fuel station profile submission failed" };
  }
}

/* ================= COMPONENT ================= */
export default function StationAddDetails() {
  const [stationLocation, setStationLocation] = useState(null);
  const error = useActionData();
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-white to-slate-200 px-4 py-10">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl p-8">
        {/* HEADER */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            ⛽ Setup Your Fuel Station
          </h2>
          <p className="text-gray-500 mt-2">
            Complete your station profile in 3 simple steps
          </p>
        </div>

        {/* PROGRESS */}
        <div className="flex items-center justify-between mb-10">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex-1 flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  step >= s
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {s}
              </div>
              {s !== 3 && (
                <div
                  className={`flex-1 h-1 ${
                    step > s ? "bg-green-400" : "bg-gray-200"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>

        {/* BACKEND ERROR */}
        {error?.message && (
          <div className="bg-red-100 text-red-600 p-3 rounded-lg text-center mb-6">
            {error.message}
          </div>
        )}

        <Form method="post" encType="multipart/form-data">
          {/* ================= STEP 1 ================= */}
          <input type="hidden" name="lat" value={stationLocation?.lat || ""} />
          <input type="hidden" name="lng" value={stationLocation?.lng || ""} />
          <div className={step === 1 ? "block" : "hidden"}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h3 className="font-semibold text-lg mb-4">
                📌 Basic Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input
                  name="stationName"
                  placeholder="Station Name"
                  className="input"
                  required
                />
                <input
                  name="contact"
                  placeholder="Contact Number"
                  className="input"
                  required
                />
                <input
                  name="city"
                  placeholder="City"
                  className="input"
                  required
                />
                <input
                  name="area"
                  placeholder="Area"
                  className="input"
                  required
                />
                <input
                  name="pincode"
                  placeholder="Pincode"
                  className="input"
                  required
                />
              </div>

              <textarea
                name="address"
                placeholder="Full Address"
                rows={3}
                className="input mt-4 resize-none"
                required
              />

              <div className="flex justify-end mt-8">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-3 rounded-xl bg-green-500 text-black font-semibold"
                >
                  Next →
                </button>
              </div>
            </motion.div>
          </div>

          {/* ================= STEP 2 ================= */}
          <div className={step === 2 ? "block" : "hidden"}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h3 className="font-semibold text-lg mb-4">⏰ Timings & Image</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input type="time" name="openTime" className="input" required />
                <input
                  type="time"
                  name="closeTime"
                  className="input"
                  required
                />
              </div>
              <div className="mb-6">
                <p className="font-semibold mb-2">
                  📍 Select Your Station Location
                </p>

                <LocationPicker
                  onSelect={(loc) => {
                    console.log("Selected station location:", loc);
                    setStationLocation(loc);
                  }}
                />

                {!stationLocation && (
                  <p className="text-red-500 text-sm mt-2">
                    Please select station location on map
                  </p>
                )}
              </div>

              <div className="mt-6">
                <input
                  type="file"
                  name="image"
                  className="w-full border border-dashed border-gray-300 rounded-xl p-3"
                  required
                />
              </div>

              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-6 py-3 rounded-xl border"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (!stationLocation) {
                      alert("Please select your station location on map");
                      return;
                    }
                    setStep(3);
                  }}
                  className="px-6 py-3 rounded-xl bg-green-500 text-black font-semibold"
                >
                  Next →
                </button>
              </div>
            </motion.div>
          </div>

          {/* ================= STEP 3 ================= */}
          <div className={step === 3 ? "block" : "hidden"}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h3 className="font-semibold text-lg mb-4">
                ⛽ Fuel Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input
                  name="petrolQty"
                  placeholder="Petrol Quantity (L)"
                  type="number"
                  className="input"
                />
                <input
                  name="petrolRate"
                  placeholder="Petrol Rate (₹)"
                  type="number"
                  className="input"
                />
                <input
                  name="dieselQty"
                  placeholder="Diesel Quantity (L)"
                  type="number"
                  className="input"
                />
                <input
                  name="dieselRate"
                  placeholder="Diesel Rate (₹)"
                  type="number"
                  className="input"
                />
              </div>

              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-3 rounded-xl border"
                >
                  ← Back
                </button>

                <button
                  type="submit"
                  className="px-8 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-green-500 to-emerald-500"
                >
                  🚀 Submit Station
                </button>
              </div>
            </motion.div>
          </div>
        </Form>
      </div>
    </div>
  );
}
