function Button({ children, onClick, variation = "primary", disabled }) {
  if (variation === "primary")
    return (
      <button
        disabled={disabled}
        onClick={onClick}
        className="bg-gradient-to-t from-green-500 to-green-600 text-white p-[0.8rem_2rem] flex gap-[0.5rem]  disabled:opacity-50  rounded-full  mt-3 shadow-[0_0_0_1px_#dcdcdc] hover:!bg-green-700 "
      >
        {children}
      </button>
    );
  if (variation === "secondary")
    return (
      <button
        disabled={disabled}
        onClick={onClick}
        className="bg-main-bg-color p-[0.8rem_2rem] flex gap-[0.5rem] text-secondary-text-color disabled:opacity-50  rounded-full  mt-3 shadow-[0_0_0_1px_#dcdcdc] hover:shadow-[0_0_0_1px_#22c55e] border-main-border-color hover:border-main-color hover:text-main-color"
      >
        {children}
      </button>
    );
}

export default Button;
