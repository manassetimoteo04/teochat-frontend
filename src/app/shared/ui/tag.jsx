import clsx from "clsx";
function Tag({ children, type = "pending", className, onClick }) {
  const types = {
    active: "bg-yellow-100 border-yellow-100 text-yellow-600",
    inactive: "bg-red-100 border-red-100 text-red-600",
    canceled: "bg-red-100 border-red-100 text-red-600",
    pending: "bg-blue-100 border-blue-100 text-blue-600",
    settled: "bg-gray-100 border-gray-100 text-gray-600",
    finished: "bg-gray-100 border-gray-100 text-gray-600",
  };
  return (
    <span
      onClick={() => onClick?.()}
      className={clsx(
        types[type],
        "text-[1.2rem] inline-block p-[0.3rem_1rem] rounded-full",
        className
      )}
    >
      {children}
    </span>
  );
}

export default Tag;
