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

export default function SpeedDelivery() {
  const location = useLocation();
  const { latitude, longitude, custName, userId } = location.state || {};

  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [otp, setOtp] = useState("");
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
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // 🧮 PRICE CALCULATION

  async function proceedToPayment() {
    if (!form.name || !form.phone || !form.address) {
      alert("Please fill all details");
      return;
    }
    if (!latitude || !longitude) {
      alert("Location not found. Please allow location access.");
      return;
    }

    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/fuelStation/showPayment`,
      {
        params: { ...form, latitude, longitude, userId },
        withCredentials: true,
      },
    );

    const data = await res.data;
    console.log(data);
    setReceipt(data);

    setStep(2);
  }

  const rate = receipt?.fuelRate;
  const baseAmount = receipt?.fuelRate;
  const speedCharge = receipt?.speedCharges; // 20%
  const totalAmount = receipt?.totalAmount;

  async function placeOrderCOD() {
    console.log("normal");
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
    alert("✅ Order placed with Cash on Delivery");
  }

  // async function verifyOtpAndPlaceOrder() {
  //   console.log("online");
  //   if (otp.length < 4) return alert("Enter valid OTP");

  //   await axios.post(
  //     `${import.meta.env.VITE_API_URL}/fuelStation/fastDeliver`,
  //     {
  //       ...form,
  //       latitude,
  //       longitude,
  //       paymentMethod: "online",
  //       otp,
  //       rate,
  //       baseAmount,
  //       speedCharge,
  //       totalAmount,
  //     },
  //     { withCredentials: true },
  //   );

  //   alert("✅ Online Payment Verified & Order Placed");
  // }

  async function showQRCode() {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/fuelStation/showQRCode`,
      {
        userId,
        userName: form.name,
        fuelQty: form.quantity,
        stationId: receipt.stationId,
        deliveryId: receipt.deliveryId,
        latitude,
        longitude,
        // paymentMethod: "online",
        fuelRate: rate,
        fuelType: form.fuelType,
        totalAmount,
      },
      { withCredentials: true },
    );

    setOnlinePaymentLink(res.data.paymentUrl);
    console.log(res.data);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] to-[#020617] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-xl"
      >
        {/* Glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-3xl blur opacity-30" />

        {/* Card */}
        <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-6 overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-orange-100">
              <FaGasPump className="text-2xl text-orange-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Speed Fuel Delivery</h1>
              <p className="text-sm text-gray-500">
                Ultra-fast doorstep fuel service
              </p>
            </div>
          </div>

          {/* Progress */}
          <div className="mb-6">
            <div className="flex justify-between text-xs font-semibold text-gray-500 mb-2">
              <span className={step >= 1 ? "text-orange-500" : ""}>
                Details
              </span>
              <span className={step >= 2 ? "text-orange-500" : ""}>
                Payment
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                animate={{ width: step === 1 ? "50%" : "100%" }}
                className="h-full bg-gradient-to-r from-orange-500 to-yellow-500"
              />
            </div>
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            {/* STEP 1 */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 50, opacity: 0 }}
                className="space-y-4"
              >
                <Input
                  icon={<FaUser />}
                  name="name"
                  placeholder="Customer Name"
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
                  placeholder="Full Address"
                  value={form.address}
                  onChange={handleChange}
                />

                <div className="grid grid-cols-2 gap-4">
                  <select
                    className="input"
                    name="fuelType"
                    value={form.fuelType}
                    onChange={handleChange}
                  >
                    <option value="petrol">⛽ Petrol</option>
                    <option value="diesel">🛢️ Diesel</option>
                  </select>

                  <input
                    className="input"
                    name="quantity"
                    type="number"
                    min="1"
                    value={form.quantity}
                    onChange={handleChange}
                  />
                </div>

                <button
                  onClick={proceedToPayment}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition"
                >
                  Continue to Payment <FaArrowRight />
                </button>
              </motion.div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                className="space-y-4"
              >
                {/* BILL SUMMARY */}
                <div className="bg-slate-50 rounded-2xl p-4 border space-y-2">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <FaReceipt /> Bill Summary
                  </h3>

                  <Row label="Fuel Type" value={form.fuelType} />
                  <Row label="Rate / Litre" value={`₹ ${rate}`} />
                  <Row label="Quantity" value={`${form.quantity} L`} />

                  <div className="border-t my-2" />

                  <Row label="Base Amount" value={`₹ ${baseAmount}`} />
                  <Row
                    label="Speed Delivery Charge (20%)"
                    value={`₹ ${speedCharge}`}
                    highlight
                  />

                  <div className="border-t my-2" />

                  <div className="flex justify-between text-lg font-bold text-green-600">
                    <span>Total Payable</span>
                    <span>₹ {totalAmount}</span>
                  </div>
                </div>

                {/* PAYMENT METHOD */}
                <div className="grid grid-cols-2 gap-4">
                  <PayCard
                    active={paymentMethod === "cod"}
                    onClick={() => setPaymentMethod("cod")}
                    icon={<FaMoneyBillWave />}
                    text="Cash on Delivery"
                  />
                  <PayCard
                    active={paymentMethod === "online"}
                    onClick={() => {
                      setPaymentMethod("online");
                      showQRCode();
                    }}
                    icon={<FaQrcode />}
                    text="Online Payment"
                  />
                </div>

                {paymentMethod === "cod" && (
                  <button
                    onClick={placeOrderCOD}
                    className="w-full py-3 rounded-xl bg-green-500 text-white font-bold"
                  >
                    ✅ Confirm Order (COD)
                  </button>
                )}

                {paymentMethod === "online" && (
                  <div className="text-center space-y-4">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${onlinePaymentLink}`}
                      className="mx-auto rounded-xl shadow"
                    />

                    <p className="text-green-600 font-semibold">
                      ⏳ Waiting for payment confirmation...
                    </p>
                  </div>
                )}

                <button
                  onClick={() => setStep(1)}
                  className="w-full py-2 text-gray-500 flex items-center justify-center gap-2"
                >
                  <FaArrowLeft /> Back to Details
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <style>{`
        .input {
          width: 100%;
          padding: 12px 14px;
          border-radius: 14px;
          border: 1px solid #e5e7eb;
          outline: none;
        }
        .input:focus {
          border-color: #f97316;
          box-shadow: 0 0 0 2px rgba(249,115,22,0.2);
        }
      `}</style>
    </div>
  );
}

/* 🔹 Small Components */

function Input({ icon, ...props }) {
  return (
    <div className="flex items-center gap-3 border rounded-xl px-4 py-3 focus-within:border-orange-500">
      <span className="text-gray-400">{icon}</span>
      <input className="w-full outline-none" {...props} />
    </div>
  );
}

function PayCard({ active, icon, text, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`p-4 rounded-2xl border-2 flex flex-col items-center justify-center gap-2 font-semibold transition ${
        active
          ? "border-orange-500 bg-orange-50 scale-[1.02]"
          : "border-gray-200 hover:border-orange-300"
      }`}
    >
      <div className="text-2xl text-orange-500">{icon}</div>
      <span>{text}</span>
    </button>
  );
}

function Row({ label, value, highlight }) {
  return (
    <div
      className={`flex justify-between text-sm ${highlight ? "text-orange-600 font-semibold" : ""}`}
    >
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
