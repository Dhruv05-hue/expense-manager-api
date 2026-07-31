export default function Input({
  label,
  type = "text",
  placeholder,
  register,
  error,
}) {
  return (
    <div className="mb-5">
      <label className="block mb-2 text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        {...register}
        className={`
          w-full
          rounded-lg
          border
          px-4
          py-3
          outline-none
          transition-all
          duration-200
          focus:ring-2
          focus:ring-blue-500
          ${
            error
              ? "border-red-500"
              : "border-gray-300"
          }
        `}
      />

      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error.message}
        </p>
      )}
    </div>
  );
}