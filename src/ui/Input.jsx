function Input({ type, placeholder, value, setValue }) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => setValue(e.target)}
      className="border focus:outline-none text-main-text-color dark:text-main-text-color-dark focus:ring-1 ring-main-color dark:bg-main-bg-color-dark-2 bg-gray-50 dark:border-main-border-color-dark  p-[1rem] rounded-[0.8rem] "
      placeholder={placeholder}
    />
  );
}

export default Input;
