function ButtonIcon({ children, roudend = "[2rem]" }) {
  return (
    <button
      className={`w-[5rem] h-[5rem] flex items-center justify-center text-[2.4rem] text-gray-700   rounded-${roudend} bg-gray-200 border-[2px] border-[#DCDCDC]`}
    >
      {children}
    </button>
  );
}

export default ButtonIcon;
