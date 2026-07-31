import { FaExclamationTriangle } from "react-icons/fa";

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  color = "red",
  loading = false,
}) {
  if (!isOpen) return null;

  const buttonColor = {
    red: "bg-red-600 hover:bg-red-700",
    blue: "bg-blue-600 hover:bg-blue-700",
    green: "bg-green-600 hover:bg-green-700",
    orange: "bg-orange-500 hover:bg-orange-600",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">

      <div className="bg-white rounded-3xl shadow-2xl w-[90%] max-w-md p-8 animate-fadeIn">

        <div className="flex justify-center">

          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">

            <FaExclamationTriangle className="text-red-600 text-3xl" />

          </div>

        </div>

        <h2 className="text-2xl font-bold text-center mt-6">
          {title}
        </h2>

        <p className="text-gray-500 text-center mt-4">
          {message}
        </p>

        <div className="flex gap-4 mt-8">

          <button
            onClick={onClose}
            className="flex-1 border border-gray-300 py-3 rounded-xl hover:bg-gray-100 transition"
          >
            {cancelText}
          </button>

          <button
            disabled={loading}
            onClick={onConfirm}
            className={`flex-1 text-white py-3 rounded-xl transition ${
              buttonColor[color]
            }`}
          >
            {loading ? "Please Wait..." : confirmText}
          </button>

        </div>

      </div>

    </div>
  );
}