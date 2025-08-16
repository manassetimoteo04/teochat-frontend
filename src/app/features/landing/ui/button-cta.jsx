function ButtonCta({ children }) {
  return (
    <button className="bg-gradient-to-b from-green-600 to-green-500 p-[1rem_2rem] flex items-center gap-[0.5rem] text-white hover:bg-green-700 rounded-full">
      {children}
    </button>
  );
}

export default ButtonCta;
