import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaChartPie,
  FaMoneyBillWave,
  FaPlane,
  FaUser,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";
import ConfirmModal from "../ui/ConfirmModal";

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
}) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [logoutOpen, setLogoutOpen] = useState(false);

  // Close sidebar whenever route changes on mobile
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname, setSidebarOpen]);

  // Prevent body scrolling while drawer is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

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
      {/* Overlay */}
      <div
        onClick={() => setSidebarOpen(false)}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden ${
          sidebarOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }`}
      />

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50
          h-screen w-72
          bg-white border-r border-gray-200 shadow-xl
          flex flex-col
          transform transition-transform duration-300 ease-in-out

          lg:sticky
          lg:top-20
          lg:h-[calc(100vh-5rem)]
          lg:translate-x-0
          lg:shadow-sm

          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* Header */}
        <div className="px-6 py-6 border-b border-gray-100 flex items-center justify-between">

          <div>
            <h1 className="text-2xl font-extrabold text-gray-800">
              Expense
              <span className="text-blue-600">
                Manager
              </span>
            </h1>

            <p className="text-sm text-gray-500 mt-2">
              Track your expenses smarter
            </p>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden h-10 w-10 rounded-lg hover:bg-gray-100 flex items-center justify-center"
          >
            <FaTimes />
          </button>

        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-5 py-6 space-y-3">

          <NavLink
            to="/dashboard"
            className={navLinkClass}
          >
            <FaChartPie />
            Dashboard
          </NavLink>

          <NavLink
            to="/expenses"
            className={navLinkClass}
          >
            <FaMoneyBillWave />
            Expenses
          </NavLink>

          <NavLink
            to="/trips"
            className={navLinkClass}
          >
            <FaPlane />
            Trips
          </NavLink>

          <NavLink
            to="/profile"
            className={navLinkClass}
          >
            <FaUser />
            Profile
          </NavLink>

        </nav>

        {/* Footer */}
        <div className="p-5 border-t border-gray-100">

          <button
            onClick={() => setLogoutOpen(true)}
            className="w-full flex items-center justify-center gap-3 rounded-xl bg-red-50 text-red-600 py-3 font-semibold hover:bg-red-100 transition"
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