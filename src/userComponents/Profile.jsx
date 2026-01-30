import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaStar, FaGasPump, FaSearch } from "react-icons/fa";
import { useDebounce } from "../fuelStationComponents/useDebounce";
import { MdOutlineDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import Loader from "../fuelStationComponents/Loader";
import { MdOutlineLocationOn } from "react-icons/md";
import SpeedDeliveryBadge from "./SpeedDeliveryBadge";

export default function Profile() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [stations, setStations] = useState([]);
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search, 300);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark",
  );

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  async function handleLogout() {
    await axios.get(`${import.meta.env.VITE_API_URL}/user/logout`, {
      withCredentials: true,
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    });
    navigate("/login");
  }

  useEffect(() => {
    async function fetchProfile() {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/user/profile`, {
        credentials: "include",
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      });
      const result = await res.json();
      // console.log(result.id);
      setData(result);
    }
    fetchProfile();
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        // console.log(lat, " ", lng);

        setLatitude(lat);
        setLongitude(lng);

        try {
          let res;

          if (!debounceSearch || debounceSearch.trim() === "") {
            // 🔹 Normal nearby stations
            res = await axios.get(
              `${import.meta.env.VITE_API_URL}/user/showNearByStation`,
              {
                params: { lat, lng },
                withCredentials: true,
                headers: {
                  "ngrok-skip-browser-warning": "true",
                },
              },
            );
          } else {
            // 🔹 Search + sort by distance
            res = await axios.get(
              `${import.meta.env.VITE_API_URL}/user/searchStationByUser`,
              {
                params: { search: debounceSearch, lat, lng },
                withCredentials: true,
                headers: {
                  "ngrok-skip-browser-warning": "true",
                },
              },
            );
          }

          setStations(res.data);
        } catch (err) {
          console.log(err);
        }
      },
      () => {
        alert("Location permission denied");
      },
    );
  }, [debounceSearch]); // ✅ VERY IMPORTANT

  return (
    <div className="min-h-screen transition-colors duration-500 bg-gradient-to-br from-slate-100 via-white to-slate-200 dark:from-[#0f172a] dark:via-[#020617] dark:to-[#020617]">
      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-black/40 border-b border-black/5 dark:border-white/10 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          {/* LOGO */}
          <h1 className="text-2xl font-extrabold tracking-wide bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
            ⛽ Fuel Indeed
          </h1>

          {/* SEARCH */}
          <div className="relative w-[360px] group">
            <FaSearch className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-orange-400 transition" />
            <input
              type="text"
              placeholder="Search nearby fuel station..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-2xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-black/40 
            text-black dark:text-white placeholder-gray-400 outline-none
            focus:ring-2 focus:ring-orange-400 transition-all duration-300"
            />
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-4">
            <Link
              to={`/user/profile/speedDelivery`}
              state={{
                userId: data?.id,
                latitude,
                longitude,
                custName: data?.name,
              }}
            >
              <SpeedDeliveryBadge />
            </Link>

            {/* THEME TOGGLE */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="relative w-11 h-11 rounded-full flex items-center justify-center
                    bg-gradient-to-br from-yellow-400 to-orange-500 dark:from-slate-700 dark:to-slate-900
                    text-white shadow-lg hover:shadow-2xl hover:scale-110 active:scale-95
                    transition-all duration-300 overflow-hidden group"
            >
              {/* Glow */}
              <span className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 blur-md transition"></span>

              {/* Icon */}
              <span
                className={`relative text-xl transition-transform duration-500 ${
                  darkMode ? "rotate-0 scale-100" : "rotate-180 scale-110"
                }`}
              >
                {darkMode ? <CiLight /> : <MdOutlineDarkMode />}
              </span>
            </button>
            {/* LOGOUT */}
            <button
              onClick={handleLogout}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 
            text-white font-semibold hover:scale-105 active:scale-95 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* ================= CONTENT ================= */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        {!data?.isProfileCompleted && (
          <Link
            to="/user/profile/complete-profile"
            className="block mb-6 text-center py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-bold animate-bounce"
          >
            ⚠ Complete Your Profile
          </Link>
        )}

        <h2 className="text-2xl font-bold mb-8 text-gray-800 dark:text-white">
          Nearby Fuel Stations
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {stations.map((station) => (
            <div
              key={station._id}
              className="group bg-white/70 dark:bg-white/5 backdrop-blur-xl rounded-3xl overflow-hidden 
            border border-black/5 dark:border-white/10 shadow hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* IMAGE */}
              <div className="relative overflow-hidden">
                <img
                  className="w-full h-52 object-cover group-hover:scale-110 transition duration-700"
                  src={`${import.meta.env.VITE_API_URL}/fuelStation/image/${station._id}`}
                  alt="station"
                />

                <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-lg text-sm flex items-center gap-2">
                  <MdOutlineLocationOn className="text-lg" />{" "}
                  {(station.distance / 1000).toFixed(2)} km
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-5 space-y-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {station.stationName}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1 text-yellow-400">
                  ⭐⭐⭐⭐☆
                  <span className="text-gray-400 text-sm ml-2">(4.0)</span>
                </div>

                {/* Rates */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="p-3 rounded-xl bg-green-500/10 text-center">
                    <p className="text-gray-400">Petrol</p>
                    <p className="font-bold text-green-500">
                      ₹ {station.petrolRate}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-blue-500/10 text-center">
                    <p className="text-gray-400">Diesel</p>
                    <p className="font-bold text-blue-500">
                      ₹ {station.dieselRate}
                    </p>
                  </div>
                </div>
                {/*  */}
                {/* Buttons */}
                <div className="flex text-lg text-center pt-2">
                  <Link
                    to={`/user/profile/bookingFuel/${station._id}`}
                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold hover:scale-105 active:scale-95 transition"
                  >
                    Book Fuel
                  </Link>

                  {/* <button className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:scale-105 active:scale-95 transition">
                    Book Diesel 
                  </button> */}
                </div>
              </div>
            </div>
          ))}
        </div>

        {stations.length === 0 && <Loader />}
      </main>
    </div>
  );
}
