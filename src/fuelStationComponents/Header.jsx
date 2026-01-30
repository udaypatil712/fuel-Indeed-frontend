export default function Header({ setSearch }) {
  return (
    <header className="sticky top-0 z-20 backdrop-blur bg-white/70 border-b border-gray-200">
      <div className="px-6 py-4 flex items-center">
        <input
          className="w-full max-w-md px-5 py-3 rounded-xl border border-gray-300
          focus:ring-2 focus:ring-green-400 outline-none"
          type="text"
          placeholder="Search fuel station..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </header>
  );
}
