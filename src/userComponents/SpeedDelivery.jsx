import axios from "axios";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  FaGasPump,
  FaMoneyBillWave,
  FaQrcode,
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaArrowRight,
  FaArrowLeft,
  FaReceipt,
} from "react-icons/fa";

function loadRazorpay() {
  return new Promise((resolve) => {
    const script = document.createElement("script");

    script.src = "https://checkout.razorpay.com/v1/checkout.js";

    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);

    document.body.appendChild(script);
  });
}

export default function SpeedDelivery() {
  const location = useLocation();
  const { latitude, longitude, custName, userId } = location.state || {};

  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("");

  const [receipt, setReceipt] = useState(null);
  const [onlinePaymentLink, setOnlinePaymentLink] = useState("");

  const [form, setForm] = useState({
    name: custName || "",
    phone: "",
    address: "",
    fuelType: "petrol",
    quantity: 1,
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  /* ================= PRICE ================= */

  async function proceedToPayment() {
    if (!form.name || !form.phone || !form.address) {
      alert("Fill all details");
      return;
    }

    if (!latitude || !longitude) {
      alert("Location access required");
      return;
    }

    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/fuelStation/showPayment`,
      {
        params: { ...form, latitude, longitude, userId },
        withCredentials: true,
      },
    );

    setReceipt(res.data);
    setStep(2);
  }

  const rate = receipt?.fuelRate;
  const baseAmount = receipt?.fuelRate;
  const speedCharge = receipt?.speedCharges;
  const totalAmount = receipt?.totalAmount;

  /* ================= COD ================= */

  async function placeOrderCOD() {
    await axios.post(
      `${import.meta.env.VITE_API_URL}/fuelStation/fastDelivery`,
      {
        userId,
        userName: form.name,
        fuelQty: form.quantity,
        stationId: receipt.stationId,
        deliveryId: receipt.deliveryId,
        latitude,
        longitude,
        paymentMethod: "cod",
        fuelRate: rate,
        fuelType: form.fuelType,
        totalAmount,
      },
      { withCredentials: true },
    );

    alert("✅ Order placed (COD)");
  }

  /* ================= QR ================= */

  async function startOnlinePayment() {
    const res = await loadRazorpay();

    if (!res) {
      alert("Razorpay SDK failed");
      return;
    }

    // Create Order
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/fuelStation/create-order`,
      {
        userId,
        userName: form.name,

        fuelQty: form.quantity,
        stationId: receipt.stationId,
        deliveryId: receipt.deliveryId,

        fuelRate: rate,
        fuelType: form.fuelType,
        totalAmount,

        latitude,
        longitude,
      },
      { withCredentials: true },
    );

    const options = {
      key: data.key,

      amount: data.order.amount,
      currency: "INR",

      name: "Fuel Indeed",

      description: "Speed Delivery",

      order_id: data.order.id,

      handler: async function (response) {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/fuelStation/verify-payment`,
          {
            ...response,
            bookingId: data.bookingId,
          },
        );

        alert("✅ Payment Successful");

        window.location.href = "/orders";
      },

      prefill: {
        name: form.name,
        contact: form.phone,
      },

      theme: {
        color: "#f97316",
      },
    };

    const razor = new window.Razorpay(options);

    razor.open();
  }

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-black flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* HEADER */}
        <div className="bg-gradient-to-r from-orange-500 to-yellow-500 p-5 text-white">
          <div className="flex items-center gap-3">
            <FaGasPump className="text-2xl" />

            <div>
              <h1 className="text-xl font-bold">Speed Delivery</h1>
              <p className="text-xs opacity-90">Fuel at your doorstep</p>
            </div>
          </div>

          {/* STEPPER */}
          <div className="flex justify-between mt-4 text-sm font-semibold">
            <span className={step >= 1 ? "text-white" : "opacity-60"}>
              Details
            </span>

            <span className={step >= 2 ? "text-white" : "opacity-60"}>
              Payment
            </span>
          </div>

          <div className="h-1 bg-white/40 rounded mt-1">
            <motion.div
              animate={{
                width: step === 1 ? "50%" : "100%",
              }}
              className="h-full bg-white rounded"
            />
          </div>
        </div>

        {/* BODY */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            {/* ================= STEP 1 ================= */}

            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ x: -40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 40, opacity: 0 }}
                className="space-y-4"
              >
                <Input
                  icon={<FaUser />}
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                />

                <Input
                  icon={<FaPhone />}
                  name="phone"
                  placeholder="Mobile Number"
                  value={form.phone}
                  onChange={handleChange}
                />

                <Input
                  icon={<FaMapMarkerAlt />}
                  name="address"
                  placeholder="Delivery Address"
                  value={form.address}
                  onChange={handleChange}
                />

                <div className="grid grid-cols-2 gap-3">
                  <select
                    name="fuelType"
                    value={form.fuelType}
                    onChange={handleChange}
                    className="input"
                  >
                    <option value="petrol">⛽ Petrol</option>
                    <option value="diesel">🛢 Diesel</option>
                  </select>

                  <input
                    name="quantity"
                    type="number"
                    min="1"
                    value={form.quantity}
                    onChange={handleChange}
                    className="input"
                  />
                </div>

                <button onClick={proceedToPayment} className="btn-primary">
                  Continue <FaArrowRight />
                </button>
              </motion.div>
            )}

            {/* ================= STEP 2 ================= */}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ x: 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -40, opacity: 0 }}
                className="space-y-5"
              >
                {/* BILL */}
                <div className="bg-slate-50 border rounded-xl p-4 space-y-2">
                  <h3 className="font-bold flex items-center gap-2">
                    <FaReceipt /> Bill
                  </h3>

                  <Row label="Fuel" value={form.fuelType} />
                  <Row label="Rate" value={`₹${rate}`} />
                  <Row label="Quantity" value={`${form.quantity} L`} />

                  <div className="border-t my-2" />

                  <Row label="Base" value={`₹${baseAmount}`} />

                  <Row
                    label="Speed Charge"
                    value={`₹${speedCharge}`}
                    highlight
                  />

                  <div className="border-t my-2" />

                  <div className="flex justify-between font-bold text-green-600">
                    <span>Total</span>
                    <span>₹ {totalAmount}</span>
                  </div>
                </div>

                {/* PAYMENT */}
                <div className="grid grid-cols-2 gap-4">
                  <PayCard
                    active={paymentMethod === "cod"}
                    onClick={() => setPaymentMethod("cod")}
                    icon={<FaMoneyBillWave />}
                    text="Cash"
                  />

                  <PayCard
                    active={paymentMethod === "online"}
                    onClick={() => {
                      setPaymentMethod("online");
                      startOnlinePayment();
                    }}
                    icon={<FaQrcode />}
                    text="Online"
                  />
                </div>

                {/* ACTION */}

                {paymentMethod === "cod" && (
                  <button onClick={placeOrderCOD} className="btn-success">
                    Confirm (COD)
                  </button>
                )}

                {/* {paymentMethod === "online" && (
                  <div className="text-center space-y-3">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${onlinePaymentLink}`}
                      className="mx-auto rounded-lg shadow"
                    />

                    <p className="text-green-600 text-sm">
                      Waiting for payment...
                    </p>
                  </div>
                )} */}

                <button onClick={() => setStep(1)} className="btn-link">
                  <FaArrowLeft /> Back
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function Input({ icon, ...props }) {
  return (
    <div className="input-wrap">
      <span>{icon}</span>
      <input {...props} />
    </div>
  );
}

function PayCard({ active, icon, text, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`pay-card ${active ? "pay-active" : ""}`}
    >
      <div className="text-2xl text-orange-500">{icon}</div>
      <span>{text}</span>
    </button>
  );
}

function Row({ label, value, highlight }) {
  return (
    <div
      className={`flex justify-between text-sm ${
        highlight ? "text-orange-600 font-semibold" : ""
      }`}
    >
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
