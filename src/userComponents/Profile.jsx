import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { FaSearch } from "react-icons/fa";
import { MdOutlineDarkMode, MdOutlineLocationOn } from "react-icons/md";
import { CiLight } from "react-icons/ci";

import { useDebounce } from "../fuelStationComponents/useDebounce";
import Loader from "../fuelStationComponents/Loader";
import SpeedDeliveryBadge from "./SpeedDeliveryBadge";

export default function Profile() {
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [stations, setStations] = useState([]);

  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search, 300);

  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      return savedTheme === "dark";
    }

    // Optional: detect system preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  /* ================= THEME ================= */

  useEffect(() => {
    const root = document.documentElement;

    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  /* ================= LOGOUT ================= */

  async function handleLogout() {
    await axios.get(`${import.meta.env.VITE_API_URL}/user/logout`, {
      withCredentials: true,
    });

    navigate("/login");
  }

  /* ================= PROFILE ================= */

  useEffect(() => {
    async function fetchProfile() {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/user/profile`, {
        credentials: "include",
      });

      const result = await res.json();
      setData(result);
    }

    fetchProfile();
  }, []);

  /* ================= LOCATION + STATIONS ================= */

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        setLatitude(lat);
        setLongitude(lng);

        try {
          let res;

          if (!debounceSearch || debounceSearch.trim() === "") {
            res = await axios.get(
              `${import.meta.env.VITE_API_URL}/user/showNearByStation`,
              {
                params: { lat, lng },
                withCredentials: true,
              },
            );
          } else {
            res = await axios.get(
              `${import.meta.env.VITE_API_URL}/user/searchStationByUser`,
              {
                params: { search: debounceSearch, lat, lng },
                withCredentials: true,
              },
            );
          }

          setStations(res.data);
        } catch (err) {
          //console.log(err);
        }
      },
      () => alert("Location permission denied"),
    );
  }, [debounceSearch]);

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#020617] transition">
      {/* ================= HEADER ================= */}

      <header className="sticky top-0 z-50 bg-white/90 dark:bg-black/80 backdrop-blur border-b border-gray-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          {/* Header Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
            {/* LOGO */}
            <div className="text-center lg:text-left">
              <h1 className="text-2xl font-extrabold bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
                ⛽ Fuel Indeed
              </h1>
            </div>

            {/* SEARCH */}
            <div className="relative w-full">
              <FaSearch className="absolute left-4 top-3.5 text-gray-400" />

              <input
                type="text"
                placeholder="Search nearby fuel station..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 rounded-xl
                border border-gray-300 dark:border-white/10
                bg-white dark:bg-black
                text-black dark:text-white
                outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            {/* ACTIONS */}
            <div className="flex items-center justify-center lg:justify-end gap-2 sm:gap-3 flex-wrap">
              {/* SPEED DELIVERY */}
              <Link
                to={`/user/profile/speedDelivery`}
                state={{
                  userId: data?.id,
                  latitude,
                  longitude,
                  custName: data?.name,
                }}
                className="flex"
              >
                <SpeedDeliveryBadge />
              </Link>

              {/* THEME */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full
    bg-gray-200 dark:bg-gray-800
    flex items-center justify-center
    hover:scale-105 transition"
              >
                {darkMode ? <CiLight /> : <MdOutlineDarkMode />}
              </button>

              {/* LOGOUT */}
              <button
                onClick={handleLogout}
                className="px-3 sm:px-4 py-2 rounded-lg
    bg-red-500 hover:bg-red-600
    text-white text-sm sm:text-base
    font-semibold transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ================= CONTENT ================= */}

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* PROFILE WARNING */}
        {!data?.isProfileCompleted && (
          <Link
            to="/user/profile/complete-profile"
            className="block mb-6 text-center py-3 rounded-lg
            bg-yellow-400 text-black font-bold"
          >
            ⚠ Complete Your Profile
          </Link>
        )}

        {/* TITLE */}
        <h2 className="text-xl md:text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          Nearby Fuel Stations
        </h2>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stations.map((station) => (
            <div
              key={station._id}
              className="bg-white dark:bg-white/5 rounded-2xl
              border border-gray-200 dark:border-white/10
              shadow hover:shadow-lg transition overflow-hidden"
            >
              {/* IMAGE */}
              <div className="relative">
                <img
                  src={`${import.meta.env.VITE_API_URL}/${station.image}`}
                  alt="station"
                  className="w-full h-48 object-cover"
                />

                <div
                  className="absolute top-3 left-3 bg-black/70 text-white
                  px-2 py-1 rounded text-xs flex items-center gap-1"
                >
                  <MdOutlineLocationOn />
                  {(station.distance / 1000).toFixed(2)} km
                </div>
              </div>

              {/* INFO */}
              <div className="p-4 space-y-3">
                <h3 className="font-bold text-lg dark:text-white">
                  {station.stationName}
                </h3>

                {/* Rating */}
                <div className="text-yellow-400 text-sm">
                  ⭐⭐⭐⭐☆ <span className="text-gray-400">(4.0)</span>
                </div>

                {/* Prices */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-green-100 dark:bg-green-500/10 rounded-lg p-2 text-center">
                    <p className="text-gray-500">Petrol</p>
                    <p className="font-bold text-green-600">
                      ₹ {station.petrolRate}
                    </p>
                  </div>

                  <div className="bg-blue-100 dark:bg-blue-500/10 rounded-lg p-2 text-center">
                    <p className="text-gray-500">Diesel</p>
                    <p className="font-bold text-blue-600">
                      ₹ {station.dieselRate}
                    </p>
                  </div>
                </div>

                {/* BUTTON */}
                <Link
                  to={`/user/profile/bookingFuel/${station._id}`}
                  className="block w-full text-center py-2 rounded-lg
                  bg-orange-500 hover:bg-orange-600 text-white font-semibold"
                >
                  Book Fuel
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* LOADING */}
        {stations.length === 0 && <Loader />}
      </main>
    </div>
  );
}
