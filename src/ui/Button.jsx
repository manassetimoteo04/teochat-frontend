function Button({ children }) {
  return (
    <button className=" bg-amber-200 p-[1.5rem] focus:outline-none focus:ring-2 rounded-full text-[1.6rem] font-bold">
      {children}
    </button>
  );
}

export default Button;
