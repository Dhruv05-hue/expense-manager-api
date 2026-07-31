import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  FaChartPie,
  FaMoneyBillWave,
  FaPlane,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";
import ConfirmModal from "../ui/ConfirmModal";

export default function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [logoutOpen, setLogoutOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinkClass = ({ isActive }) =>
    `group flex items-center gap-4 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
      isActive
        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
        : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
    }`;

  return (
    <>
      <aside className="hidden lg:flex lg:w-72 bg-white border-r border-gray-200 shadow-sm flex-col">

        <div className="px-6 py-8 border-b border-gray-100">

          <h1 className="text-2xl font-extrabold text-gray-800">
            Expense<span className="text-blue-600">Manager</span>
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            Track your expenses smarter
          </p>

        </div>

        <nav className="flex-1 px-5 py-6 space-y-3">

          <NavLink to="/dashboard" className={navLinkClass}>
            <FaChartPie className="text-lg" />
            Dashboard
          </NavLink>

          <NavLink to="/expenses" className={navLinkClass}>
            <FaMoneyBillWave className="text-lg" />
            Expenses
          </NavLink>

          <NavLink to="/trips" className={navLinkClass}>
            <FaPlane className="text-lg" />
            Trips
          </NavLink>

          <NavLink to="/profile" className={navLinkClass}>
            <FaUser className="text-lg" />
            Profile
          </NavLink>

        </nav>

        <div className="p-5 border-t border-gray-100">

          <button
            onClick={() => setLogoutOpen(true)}
            className="w-full flex items-center justify-center gap-3 rounded-xl bg-red-50 text-red-600 py-3 font-semibold hover:bg-red-100 transition-all duration-300"
          >
            <FaSignOutAlt />
            Logout
          </button>

        </div>

      </aside>

      <ConfirmModal
        isOpen={logoutOpen}
        onClose={() => setLogoutOpen(false)}
        onConfirm={handleLogout}
        title="Logout"
        message="Are you sure you want to log out? You will need to log in again to access your account."
        confirmText="Logout"
        cancelText="Cancel"
        color="blue"
      />
    </>
  );
}