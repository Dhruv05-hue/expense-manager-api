export default function Loader({
  size = "w-5 h-5",
  border = "border-4",
  className = "",
}) {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div
        className={`
          ${size}
          ${border}
          border-white
          border-t-transparent
          rounded-full
          animate-spin
        `}
      ></div>
    </div>
  );
}