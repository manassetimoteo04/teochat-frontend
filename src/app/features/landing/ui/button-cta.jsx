function ButtonCta({ children }) {
  return (
    <button className="bg-green-500 bg-gradient-to-r from-green-600/50 to-green-500 p-[1rem_2rem] flex items-center gap-[0.5rem] text-white hover:bg-green-600 rounded-full">
      {children}
    </button>
  );
}

export default ButtonCta;
