import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import {
  sendChangePasswordOTP,
  changePassword,
} from "../../services/userService";

export default function ChangePasswordModal({
  isOpen,
  onClose,
}) {
  const {
  register,
  handleSubmit,
  reset,
  formState: { errors },
} = useForm();

  const [step, setStep] = useState(1);

  const [loading, setLoading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  useEffect(() => {
  if (!isOpen) {
    reset();

    setStep(1);

    setCountdown(0);

    setCurrentPassword("");

    setShowCurrent(false);
    setShowNew(false);
    setShowConfirm(false);
  }
}, [isOpen, reset]);

  if (!isOpen) return null;

  const handleSendOTP = async (data) => {
  try {
    setLoading(true);

    setCurrentPassword(data.currentPassword);

    const response = await sendChangePasswordOTP({
      currentPassword: data.currentPassword,
    });

    toast.success(response.data.message);

    setStep(2);

    setCountdown(60);
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
        "Failed to send OTP."
    );
  } finally {
    setLoading(false);
  }
};


const handleResendOTP = async () => {
  try {
    setLoading(true);

    const response = await sendChangePasswordOTP({
      currentPassword,
    });

    toast.success(response.data.message);

    setCountdown(60);
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
        "Failed to resend OTP."
    );
  } finally {
    setLoading(false);
  }
};

  const handleChangePassword = async (data) => {
    try {
      if (data.newPassword !== data.confirmPassword) {
        return toast.error("Passwords do not match.");
      }

      setLoading(true);

      const response = await changePassword({
        otp: data.otp,
        newPassword: data.newPassword,
      });

      toast.success(response.data.message);

      reset();

      setStep(1);

      setCountdown(0);

      setCurrentPassword("");

onClose();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to change password."
      );
    } finally {
      setLoading(false);
    }
  };

    return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
    <div className="bg-white rounded-3xl shadow-2xl w-[95%] max-w-md p-8">

      <h2 className="text-3xl font-bold text-center mb-8">
        Change Password
      </h2>

      <form
        onSubmit={handleSubmit(
          step === 1
            ? handleSendOTP
            : handleChangePassword
        )}
        className="space-y-6"
      >

        {/* STEP 1 */}

        {step === 1 && (
          <>
            <div>
              <label className="font-medium">
                Current Password
              </label>

              <div className="relative mt-2">
                <input
                  type={showCurrent ? "text" : "password"}
                  placeholder="Enter your current password"
                  {...register("currentPassword", {
                    required: "Current password is required",
                  })}
                  className="w-full border rounded-xl px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  {showCurrent ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <p className="text-red-500 text-sm mt-1">
                {errors.currentPassword?.message}
              </p>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 border py-3 rounded-xl hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white py-3 rounded-xl transition"
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>
            </div>
          </>
        )}

        {/* STEP 2 */}

        {step === 2 && (
          <>
            <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-sm text-green-700">
              ✅ OTP has been sent to your registered email.
            </div>

            <div>
              <label className="font-medium">
                OTP
              </label>

              <input
                type="text"
                maxLength={6}
                placeholder="Enter 6-digit OTP"
                {...register("otp", {
                  required: "OTP is required",
                  minLength: {
                    value: 6,
                    message: "OTP must be 6 digits",
                  },
                  maxLength: {
                    value: 6,
                    message: "OTP must be 6 digits",
                  },
                })}
                className="w-full border rounded-xl px-4 py-3 mt-2 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <p className="text-red-500 text-sm mt-1">
                {errors.otp?.message}
              </p>
            </div>

            <div>
              <label className="font-medium">
                New Password
              </label>

              <div className="relative mt-2">
                <input
                  type={showNew ? "text" : "password"}
                  placeholder="Enter your new password"
                  {...register("newPassword", {
                    required: "New password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className="w-full border rounded-xl px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  {showNew ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <p className="text-red-500 text-sm mt-1">
                {errors.newPassword?.message}
              </p>
            </div>

            <div>
              <label className="font-medium">
                Confirm Password
              </label>

              <div className="relative mt-2">
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm your new password"
                  {...register("confirmPassword", {
                    required: "Confirm password is required",
                  })}
                  className="w-full border rounded-xl px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  {showConfirm ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword?.message}
              </p>
            </div>

            <div className="text-center text-sm text-gray-500">
              {countdown > 0 ? (
                <p>
                  You can resend OTP in{" "}
                  <span className="font-semibold text-blue-600">
                    {countdown}s
                  </span>
                </p>
              ) : (
                <button
                  type="button"
                  onClick={handleResendOTP}
                  disabled={loading}
                  className="text-blue-600 hover:underline disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                  {loading ? "Sending..." : "Resend OTP"}
                </button>
              )}
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 border py-3 rounded-xl hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed text-white py-3 rounded-xl transition"
              >
                {loading ? "Updating..." : "Change Password"}
              </button>
            </div>
          </>
        )}

      </form>

    </div>
  </div>
);
}