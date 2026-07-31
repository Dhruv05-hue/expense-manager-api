import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaBriefcase,
  FaUserEdit,
  FaLock,
  FaTrash,
} from "react-icons/fa";

import DashboardLayout from "../../components/layout/DashboardLayout";

import { getProfile } from "../../services/userService";

import EditProfileModal from "../../components/profile/EditProfileModal";
import ChangePasswordModal from "../../components/profile/ChangePasswordModal";
import DeleteAccountModal from "../../components/profile/DeleteAccountModal";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [editOpen, setEditOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);

      const response = await getProfile();

      setUser(response.data.user);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load profile."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>

            <div className="max-w-6xl mx-auto space-y-8">

        {/* Hero Section */}

        <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 md:p-10 shadow-xl">

          {loading ? (
            <div className="text-center text-white text-lg">
              Loading Profile...
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

              <div className="flex flex-col md:flex-row items-center gap-6">

                {/* Avatar */}

                <div className="w-32 h-32 rounded-full bg-white/20 border-4 border-white flex items-center justify-center text-5xl font-bold text-white shadow-lg">

                  {user?.name
                    ?.split(" ")
                    .map((word) => word[0])
                    .join("")
                    .substring(0, 2)
                    .toUpperCase()}

                </div>

                <div className="text-center md:text-left text-white">

                  <h1 className="text-4xl font-bold">
                    {user?.name}
                  </h1>

                  <p className="text-xl opacity-90 mt-2">
                    {user?.profession || "Expense Manager User"}
                  </p>

                  <p className="mt-3 opacity-80 flex items-center justify-center md:justify-start gap-2">
                    <FaEnvelope />
                    {user?.email}
                  </p>

                </div>

              </div>

              <button
                onClick={() => setEditOpen(true)}
                className="bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold shadow hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                <FaUserEdit />
                Edit Profile
              </button>

            </div>
          )}

        </div>

                <div className="grid lg:grid-cols-2 gap-8">

          {/* Personal Information */}

          <div className="bg-white rounded-3xl shadow-lg p-8">

            <h2 className="text-2xl font-bold mb-8">
              Personal Information
            </h2>

            <div className="space-y-8">

              <div className="flex items-center gap-4">

                <FaUserCircle className="text-blue-600 text-2xl" />

                <div>
                  <p className="text-gray-500 text-sm">
                    Full Name
                  </p>

                  <p className="font-semibold text-lg">
                    {user?.name}
                  </p>
                </div>

              </div>

              <div className="flex items-center gap-4">

                <FaEnvelope className="text-green-600 text-2xl" />

                <div>
                  <p className="text-gray-500 text-sm">
                    Email Address
                  </p>

                  <p className="font-semibold text-lg break-all">
                    {user?.email}
                  </p>
                </div>

              </div>

              <div className="flex items-center gap-4">

                <FaPhone className="text-orange-500 text-2xl" />

                <div>
                  <p className="text-gray-500 text-sm">
                    Phone Number
                  </p>

                  <p className="font-semibold text-lg">
                    {user?.phone || "Not Added"}
                  </p>
                </div>

              </div>

              <div className="flex items-center gap-4">

                <FaBriefcase className="text-purple-600 text-2xl" />

                <div>
                  <p className="text-gray-500 text-sm">
                    Profession
                  </p>

                  <p className="font-semibold text-lg">
                    {user?.profession || "Not Added"}
                  </p>
                </div>

              </div>

            </div>

          </div>

          {/* Right Side */}

          <div className="space-y-8">

            {/* Security Card */}

            <div className="bg-white rounded-3xl shadow-lg p-8">

              <h2 className="text-2xl font-bold mb-3">
                Security
              </h2>

              <p className="text-gray-500 mb-6">
                Keep your account secure by updating your password regularly.
              </p>

              <button
                onClick={() => setPasswordOpen(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition-all duration-300 flex justify-center items-center gap-3"
              >
                <FaLock />
                Change Password
              </button>

            </div>

            {/* Danger Zone */}

            <div className="bg-red-50 border border-red-200 rounded-3xl p-8">

              <h2 className="text-2xl font-bold text-red-600 mb-3">
                Danger Zone
              </h2>

              <p className="text-gray-600 mb-6">
                Deleting your account is permanent. All your expenses,
                categories and profile information will be removed forever.
              </p>

              <button
                onClick={() => setDeleteOpen(true)}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl transition-all duration-300 flex justify-center items-center gap-3"
              >
                <FaTrash />
                Delete Account
              </button>

            </div>

          </div>

        </div>

                {/* Edit Profile Modal */}
        <EditProfileModal
          isOpen={editOpen}
          onClose={() => setEditOpen(false)}
          user={user}
          onSuccess={fetchProfile}
        />

        {/* Change Password Modal */}
        <ChangePasswordModal
          isOpen={passwordOpen}
          onClose={() => setPasswordOpen(false)}
        />

        {/* Delete Account Modal */}
        <DeleteAccountModal
          isOpen={deleteOpen}
          onClose={() => setDeleteOpen(false)}
        />

      </div>
    </DashboardLayout>
  );
}