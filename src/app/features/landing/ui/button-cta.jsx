import { useNavigate } from "react-router-dom";

function ButtonCta({ children }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/sign-in")}
      className="bg-gradient-to-b text-[1.4rem] sm:text-[1.6rem] from-green-600 to-green-500 p-[1rem_2rem] flex items-center gap-[0.5rem] text-white hover:bg-green-700 rounded-full"
    >
      {children}
    </button>
  );
}

export default ButtonCta;
