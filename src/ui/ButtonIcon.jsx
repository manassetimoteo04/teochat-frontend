<<<<<<< HEAD
function ButtonIcon({ children, roudend = "[2rem]" }) {
  return (
    <button
      className={`w-[5rem] h-[5rem] flex items-center justify-center text-[2.4rem] text-gray-700   rounded-${roudend} bg-gray-200 border-[2px] border-[#DCDCDC]`}
=======
function ButtonIcon({
  onClick,
  children,

  hidden,
}) {
  return (
    <button
      onClick={onClick}
      className={`${hidden} sm:flex  text-[2.4rem] text-secondary-text-color dark:text-secondary-text-color-dark flex items-center  justify-center`}
>>>>>>> 26a9d0f (primeiro commit)
    >
      {children}
    </button>
  );
}

export default ButtonIcon;
