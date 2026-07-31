import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 h-20 bg-white/80 backdrop-blur-md border-b border-gray-200 px-8 flex items-center justify-between">

      {/* Left */}
      <div>
        <h2 className="text-3xl font-bold text-gray-800">
          Dashboard
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Welcome back,
          <span className="font-semibold text-blue-600">
            {" "}{user?.name}
          </span>
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">

        {/* Search Box */}
        <div className="hidden lg:flex items-center gap-3 bg-gray-100 rounded-xl px-4 py-2 w-72">
          <FaSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-sm w-full"
          />
        </div>

        {/* Notification */}
        <button className="relative h-11 w-11 rounded-xl bg-gray-100 hover:bg-blue-50 hover:text-blue-600 transition flex items-center justify-center">
          <FaBell />

          <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center">
            0
          </span>
        </button>

        {/* User */}
        <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-3 py-2 border border-gray-200">

          <FaUserCircle
            size={40}
            className="text-blue-600"
          />

          <div className="hidden md:block">
            <h4 className="font-semibold text-gray-800">
              {user?.name}
            </h4>

            <p className="text-xs text-gray-500">
              {user?.email}
            </p>
          </div>

        </div>

      </div>

    </header>
  );
}