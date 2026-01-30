import { redirect, Form, useActionData } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  validateStep1,
  validateStep2,
  validateStep3,
} from "./UpdateValidation";
import LocationPicker from "./LocationPicker";

export async function UpdateActionStation({ request, params }) {
  const { id } = params;
  const data = await request.formData();

  //   console.log("Updating ID:", id);

  // Debug
  //   for (let pair of data.entries()) {
  //     console.log(pair[0], pair[1]);
  //   }

  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/fuelStation/updateDetails/${id}`,
      {
        method: "PATCH",
        body: data,
        credentials: "include",
      },
    );

    if (!res.ok) {
      const errData = await res.json();
      return errData;
    }

    // const result = await res.json();
    // console.log("UPDATED:", result);

    return redirect("/fuelStation/profile");
  } catch (err) {
    return { message: "Fuel station profile update failed" };
  }
}

/* ================= COMPONENT ================= */
export default function UpdateStation() {
  const error = useActionData();
  const [msg, setMsg] = useState("");
  const [step, setStep] = useState(1);
  const [stationLocation, setStationLocation] = useState(null);

  const [formData, setFormData] = useState({
    stationName: "",
    lat: "",
    lng: "",
    contact: "",
    city: "",
    area: "",
    pincode: "",
    address: "",
    openTime: "",
    closeTime: "",
    petrolQty: "",
    petrolRate: "",
    dieselQty: "",
    dieselRate: "",
  });

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-white to-slate-200 px-4 py-10">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl p-8">
        {/* HEADER */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            ⛽ Update Your Fuel Station
          </h2>
          <p className="text-gray-500 mt-2">
            Update your station profile in 3 simple steps
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
          <div className="bg-red-100 text-red-600 p-3 rounded-lg text-center mb-4">
            {error.message}
          </div>
        )}

        {/* FRONTEND ERROR */}
        {msg && (
          <div className="bg-red-100 text-red-600 p-3 rounded-lg text-center mb-4">
            {msg}
          </div>
        )}

        <Form method="post" encType="multipart/form-data">
          {/* 🔥 Hidden inputs so ALL TEXT fields are submitted */}
          <input
            type="hidden"
            name="stationName"
            value={formData.stationName}
          />
          <input type="hidden" name="lat" value={stationLocation?.lat || ""} />
          <input type="hidden" name="lng" value={stationLocation?.lng || ""} />
          <input type="hidden" name="contact" value={formData.contact} />
          <input type="hidden" name="city" value={formData.city} />
          <input type="hidden" name="area" value={formData.area} />
          <input type="hidden" name="pincode" value={formData.pincode} />
          <input type="hidden" name="address" value={formData.address} />
          <input type="hidden" name="openTime" value={formData.openTime} />
          <input type="hidden" name="closeTime" value={formData.closeTime} />
          <input type="hidden" name="petrolQty" value={formData.petrolQty} />
          <input type="hidden" name="petrolRate" value={formData.petrolRate} />
          <input type="hidden" name="dieselQty" value={formData.dieselQty} />
          <input type="hidden" name="dieselRate" value={formData.dieselRate} />

          {/* ================= STEP 1 ================= */}
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
                  className="input"
                  placeholder="Station Name"
                  value={formData.stationName}
                  onChange={(e) => updateField("stationName", e.target.value)}
                />
                <input
                  className="input"
                  placeholder="Contact"
                  value={formData.contact}
                  onChange={(e) => updateField("contact", e.target.value)}
                />
                <input
                  className="input"
                  placeholder="City"
                  value={formData.city}
                  onChange={(e) => updateField("city", e.target.value)}
                />
                <input
                  className="input"
                  placeholder="Area"
                  value={formData.area}
                  onChange={(e) => updateField("area", e.target.value)}
                />
                <input
                  className="input"
                  placeholder="Pincode"
                  value={formData.pincode}
                  onChange={(e) => updateField("pincode", e.target.value)}
                />
              </div>

              <textarea
                className="input mt-4"
                placeholder="Full Address"
                value={formData.address}
                onChange={(e) => updateField("address", e.target.value)}
              />

              <div className="flex justify-end mt-8">
                <button
                  type="button"
                  onClick={() => {
                    const res = validateStep1(formData);
                    setMsg(res.msg);
                    if (res.ok) setStep(2);
                  }}
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
                <input
                  type="time"
                  className="input"
                  value={formData.openTime}
                  onChange={(e) => updateField("openTime", e.target.value)}
                />
                <input
                  type="time"
                  className="input"
                  value={formData.closeTime}
                  onChange={(e) => updateField("closeTime", e.target.value)}
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

              {/* 🔥 THIS MUST STAY MOUNTED */}
              <div className="mt-6">
                <input
                  type="file"
                  name="image"
                  className="w-full border border-dashed border-gray-300 rounded-xl p-3"
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
                  type="number"
                  className="input"
                  placeholder="Petrol Qty"
                  value={formData.petrolQty}
                  onChange={(e) => updateField("petrolQty", e.target.value)}
                />
                <input
                  type="number"
                  className="input"
                  placeholder="Petrol Rate"
                  value={formData.petrolRate}
                  onChange={(e) => updateField("petrolRate", e.target.value)}
                />
                <input
                  type="number"
                  className="input"
                  placeholder="Diesel Qty"
                  value={formData.dieselQty}
                  onChange={(e) => updateField("dieselQty", e.target.value)}
                />
                <input
                  type="number"
                  className="input"
                  placeholder="Diesel Rate"
                  value={formData.dieselRate}
                  onChange={(e) => updateField("dieselRate", e.target.value)}
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
                  onClick={(e) => {
                    const res = validateStep3(formData);
                    if (!res.ok) {
                      e.preventDefault();
                      setMsg(res.msg);
                    }
                  }}
                  className="px-8 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-green-500 to-emerald-500"
                >
                  🚀 Update Station
                </button>
              </div>
            </motion.div>
          </div>
        </Form>
      </div>
    </div>
  );
}
