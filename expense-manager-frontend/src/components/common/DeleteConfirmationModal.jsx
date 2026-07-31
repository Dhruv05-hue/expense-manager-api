import { FaExclamationTriangle, FaTrash } from "react-icons/fa";

export default function DeleteConfirmationModal({
  isOpen,
  title = "Delete Expense",
  message,
  onCancel,
  onConfirm,
  loading = false,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl animate-[fadeIn_.25s_ease]">

        <div className="flex flex-col items-center p-8">

          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
            <FaExclamationTriangle
              size={34}
              className="text-red-600"
            />
          </div>

          <h2 className="mt-6 text-2xl font-bold text-gray-800">
            {title}
          </h2>

          <p className="mt-3 text-center text-gray-500">
            {message}
          </p>

          <div className="mt-8 flex w-full gap-3">

            <button
              onClick={onCancel}
              disabled={loading}
              className="flex-1 rounded-xl border border-gray-200 py-3 font-semibold transition hover:bg-gray-100 disabled:opacity-60"
            >
              Cancel
            </button>

            <button
              onClick={onConfirm}
              disabled={loading}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"
            >
              <FaTrash />

              {loading ? "Deleting..." : "Delete"}
            </button>

          </div>

        </div>
      </div>

      <style>{`
        @keyframes fadeIn{
          from{
            opacity:0;
            transform:scale(.95);
          }
          to{
            opacity:1;
            transform:scale(1);
          }
        }
      `}</style>
    </div>
  );
}