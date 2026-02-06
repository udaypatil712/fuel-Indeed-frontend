import { FaBars } from "react-icons/fa";

export default function Header({ setSearch, setSidebarOpen }) {
  return (
    <header
      className="
        fixed top-0 left-0 right-0
        z-40
        bg-white/90 backdrop-blur
        border-b border-gray-200
        
      "
    >
      <div
        className="
          h-16
          px-4 sm:px-6
          flex items-center gap-3
        "
      >
        {/* MOBILE MENU */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="
            lg:hidden
            p-2 rounded-lg
            hover:bg-gray-100
            transition
          "
        >
          <FaBars className="text-lg" />
        </button>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search fuel station..."
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full max-w-md mx-auto
            px-4 py-2 sm:py-2.5
            rounded-xl
            border border-gray-300

            focus:ring-2 focus:ring-green-400
            outline-none

            text-sm sm:text-base
          "
        />
      </div>
    </header>
  );
}
