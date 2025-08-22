import { useState } from "react";

function Input({ label, id, value, setValue, type = "text" }) {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <div className=" w-full border-[1px] h-[5rem] border-main-border-color rounded-2xl overflow-hidden relative">
      <label
        htmlFor={id}
        className={`${
          isFocus || value ? "top-[1.3rem] text-[1.4rem] " : ""
        } absolute top-1/2 z-9 text-secondary-text-color -translate-y-1/2 left-[1.5rem]`}
      >
        {label}
      </label>
      <input
        type={type}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(e) => setValue(e.target.value)}
        id={id}
        className="p-[1.5rem] focus:outline-none !transition-none bottom-[-1rem] bg-transparent absolute w-full"
      />
    </div>
  );
}

export default Input;
