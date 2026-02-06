import { redirect, Form, useActionData } from "react-router-dom";

import { motion } from "framer-motion";

import { useState, useEffect, useRef } from "react";

import LocationPicker from "./LocationPicker";

/* ================= ACTION ================= */

export async function CompleteFuelStationAction({ request }) {
  const data = await request.formData();

  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/fuelStation/complete-profile`,
      {
        method: "POST",
        body: data,
        credentials: "include",
      },
    );

    const resData = await res.json();

    if (!res.ok) {
      return resData;
    }

    return redirect("/fuelStation/profile");
  } catch (err) {
    return {
      message: "Server not responding. Please try again later.",
      step: 1,
    };
  }
}

/* ================= COMPONENT ================= */

export default function StationAddDetails() {
  const actionData = useActionData();

  const formRef = useRef();

  const [stationLocation, setStationLocation] = useState(null);

  const [step, setStep] = useState(1);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formError, setFormError] = useState("");

  /* ================= AUTO RETURN TO ERROR STEP ================= */

  useEffect(() => {
    if (actionData?.step) {
      setStep(actionData.step);
      setIsSubmitting(false);
    }

    if (actionData?.message) {
      setFormError(actionData.message);
    }
  }, [actionData]);

  /* ================= STEP VALIDATION ================= */

  const validateStep1 = () => {
    const fields = [
      "stationName",
      "contact",
      "city",
      "area",
      "pincode",
      "address",
    ];

    for (let name of fields) {
      const input = formRef.current[name];

      if (!input.value.trim()) {
        setFormError("Please complete all basic station details.");
        input.focus();
        return false;
      }
    }

    setFormError("");
    return true;
  };

  const validateStep2 = () => {
    const openTime = formRef.current.openTime.value;
    const closeTime = formRef.current.closeTime.value;
    const image = formRef.current.image.files[0];

    if (!openTime || !closeTime) {
      setFormError("Please select opening and closing time.");
      return false;
    }

    if (!stationLocation) {
      setFormError("Please select your station location on the map.");
      return false;
    }

    if (!image) {
      setFormError("Please upload a clear station image.");
      return false;
    }

    setFormError("");
    return true;
  };

  const validateStep3 = () => {
    const fields = ["petrolQty", "petrolRate", "dieselQty", "dieselRate"];

    for (let name of fields) {
      const input = formRef.current[name];

      if (!input.value || input.value <= 0) {
        setFormError("Please enter valid fuel quantity and rate.");
        input.focus();
        return false;
      }
    }

    setFormError("");
    return true;
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = (e) => {
    if (!validateStep3()) {
      e.preventDefault();
      return;
    }

    setFormError("");
    setIsSubmitting(true);
  };

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

        {/* ERROR BOX */}

        {(formError || actionData?.message) && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-6">
            <p className="font-semibold flex items-center gap-2">
              ⚠️ Please fix the following
            </p>

            <p className="mt-1 text-sm">{formError || actionData?.message}</p>
          </div>
        )}

        <Form
          method="post"
          encType="multipart/form-data"
          ref={formRef}
          onSubmit={handleSubmit}
        >
          {/* Hidden Location */}

          <input type="hidden" name="lat" value={stationLocation?.lat || ""} />

          <input type="hidden" name="lng" value={stationLocation?.lng || ""} />

          {/* ================= STEP 1 ================= */}

          <div className={step === 1 ? "block" : "hidden"}>
            <h3 className="font-semibold text-lg mb-4">📌 Basic Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input
                name="stationName"
                placeholder="Station Name"
                className="input"
              />

              <input
                name="contact"
                placeholder="Contact Number"
                className="input"
              />

              <input name="city" placeholder="City" className="input" />

              <input name="area" placeholder="Area" className="input" />

              <input name="pincode" placeholder="Pincode" className="input" />
            </div>

            <textarea
              name="address"
              placeholder="Full Address"
              rows={3}
              className="input mt-4 resize-none"
            />

            <div className="flex justify-end mt-8">
              <button
                type="button"
                onClick={() => {
                  if (validateStep1()) setStep(2);
                }}
                className="px-6 py-3 rounded-xl bg-green-500 font-semibold"
              >
                Next →
              </button>
            </div>
          </div>

          {/* ================= STEP 2 ================= */}

          <div className={step === 2 ? "block" : "hidden"}>
            <h3 className="font-semibold text-lg mb-4">⏰ Timings & Image</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input type="time" name="openTime" className="input" />

              <input type="time" name="closeTime" className="input" />
            </div>

            <div className="mb-6">
              <p className="font-semibold mb-2">
                📍 Select Your Station Location
              </p>

              <LocationPicker onSelect={(loc) => setStationLocation(loc)} />
            </div>

            <input
              type="file"
              name="image"
              accept="image/*"
              className="w-full border border-dashed rounded-xl p-3"
            />

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
                  if (validateStep2()) setStep(3);
                }}
                className="px-6 py-3 rounded-xl bg-green-500 font-semibold"
              >
                Next →
              </button>
            </div>
          </div>

          {/* ================= STEP 3 ================= */}

          <div className={step === 3 ? "block" : "hidden"}>
            <h3 className="font-semibold text-lg mb-4">⛽ Fuel Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input
                name="petrolQty"
                type="number"
                placeholder="Petrol Qty"
                className="input"
              />

              <input
                name="petrolRate"
                type="number"
                placeholder="Petrol Rate"
                className="input"
              />

              <input
                name="dieselQty"
                type="number"
                placeholder="Diesel Qty"
                className="input"
              />

              <input
                name="dieselRate"
                type="number"
                placeholder="Diesel Rate"
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
                disabled={isSubmitting}
                className="px-8 py-3 rounded-xl text-white font-semibold bg-green-600 disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "🚀 Submit Station"}
              </button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
