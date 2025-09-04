function Button({ children, onClick, variation = "primary", disabled }) {
  if (variation === "primary")
    return (
      <button
        disabled={disabled}
        onClick={onClick}
        className=" bg-green-500 flex items-center text-black justify-center gap-[0.5rem] hover:bg-green-600 w-full p-[0.8rem_1.5rem] rounded-full "
      >
        {children}
      </button>
    );
  if (variation === "secondary")
    return (
      <button
        disabled={disabled}
        onClick={onClick}
        className="bg-main-bg-color p-[0.8rem_1.5rem] w-full items-center justify-center flex gap-[0.5rem] text-secondary-text-color disabled:opacity-50  rounded-full  mt-3 shadow-[0_0_0_1px_#dcdcdc] hover:shadow-[0_0_0_1px_#22c55e] border-main-border-color hover:border-main-color hover:text-main-color"
      >
        {children}
      </button>
    );
  if (variation === "danger")
    return (
      <button
        disabled={disabled}
        onClick={onClick}
        className="bg-red-500 p-[0.8rem_1.5rem] w-full items-center justify-center flex gap-[0.5rem] text-white disabled:opacity-50  rounded-full  mt-3 shadow-[0_0_0_1px_#dcdcdc]  border-main-border-color  hover:bg-red-600"
      >
        {children}
      </button>
    );
  if (variation === "dashed")
    return (
      <button
        style={{ borderWidth: "2px" }}
        disabled={disabled}
        onClick={onClick}
        className="w-full flex items-center justify-center gap-2
             p-[0.5rem_1.5rem] mt-3 rounded-full
             border border-dashed  border-main-border-color
             text-secondary-text-color disabled:opacity-50
              hover:text-main-color"
      >
        {children}
      </button>
    );
}

export default Button;
