import { ArrowRight } from "lucide-react";
import ButtonCta from "../ui/button-cta";
import { useNavigate } from "react-router-dom";
function Header() {
  const navigate = useNavigate();
  return (
    <header className="flex absolute top-0 left-0 w-full justify-between items-center p-[2rem]">
      <h1 className="flex items-center sm:text-[2.4rem] relative">
        <img src="./logo.png" className="sm:w-[3.5rem] w-[2.5rem] h-auto" />
        TeoChat
        <span className=" inline-block w-[0.5rem] h-[0.5rem] sm:w-[0.8rem] absolute -right-[1rem] bottom-[0.7rem] sm:h-[0.8rem] rounded-full bg-main-color">
          &nbsp;
        </span>
      </h1>
      <ButtonCta onClick={() => navigate("/sign-up")}>
        Começar Agora <ArrowRight size={18} />
      </ButtonCta>
    </header>
  );
}

export default Header;
