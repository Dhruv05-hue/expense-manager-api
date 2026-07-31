import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import Card from "../../components/ui/Card";
import Loader from "../../components/common/Loader";

import {
  verifyOTP,
  resendOTP,
} from "../../services/authService";

export default function VerifyOTP() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";

  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [timer, setTimer] = useState(60);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (!email) {
      navigate("/signup");
    }
  }, [email, navigate]);

  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const response = await verifyOTP({
        email,
        otp: data.otp,
      });

      toast.success(response.data.message);

      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Verification failed."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      setResending(true);

      const response = await resendOTP({
        email,
      });

      toast.success(response.data.message);

      setTimer(60);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to resend OTP."
      );
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">
      <Card>

        <h1 className="text-3xl font-bold text-center text-blue-600">
          Verify OTP
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Enter the OTP sent to
          <br />
          <span className="font-semibold">{email}</span>
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>

          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              OTP
            </label>

            <input
              type="text"
              maxLength={6}
              placeholder="Enter 6-digit OTP"
              {...register("otp", {
                required: "OTP is required",
                pattern: {
                  value: /^[0-9]{6}$/,
                  message: "OTP must be exactly 6 digits",
                },
              })}
              className={`w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.otp
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />

            {errors.otp && (
              <p className="text-red-500 text-sm mt-1">
                {errors.otp.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-lg font-semibold flex justify-center items-center"
          >
            {loading ? <Loader /> : "Verify OTP"}
          </button>

        </form>

        <div className="text-center mt-6">

          {timer > 0 ? (
            <p className="text-gray-500">
              Resend OTP in <b>{timer}s</b>
            </p>
          ) : (
            <button
              onClick={handleResendOTP}
              disabled={resending}
              className="text-blue-600 font-semibold hover:underline"
            >
              {resending ? "Sending..." : "Resend OTP"}
            </button>
          )}

        </div>

        <p className="text-center mt-6 text-sm">
          Wrong email?{" "}
          <Link
            to="/signup"
            className="text-blue-600 font-semibold hover:underline"
          >
            Go Back
          </Link>
        </p>

      </Card>
    </div>
  );
}