import clsx from "clsx";

function Button({
  children,
  onClick,
  variation = "primary",
  size = "md",
  disabled,
  className,
}) {
  const base =
    "flex items-center justify-center gap-[0.5rem] rounded-full font-medium disabled:opacity-50 transition" +
    "  " +
    className;

  const variants = {
    primary: "bg-green-500 text-black hover:bg-green-600",
    secondary:
      "bg-main-bg-color text-secondary-text-color shadow-[inset_0_0_0_1px_#dcdcdc] hover:shadow-[inset_0_0_0_1px_#22c55e] hover:text-main-text-color",
    danger: "bg-red-500 text-white hover:bg-red-600",
    dashed:
      "border-2 border-dashed border-main-border-color text-secondary-text-color hover:text-main-color",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-[1.4rem]",
    md: "px-6 py-2.5 text-[1.6rem]",
    lg: "px-8 py-3 text-[1.8rem]",
  };

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        base,
        variants[variation],
        sizes[size],
        "w-full",
        className,
      )}
    >
      {children}
    </button>
  );
}

export default Button;
