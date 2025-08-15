import { ArrowRight } from "lucide-react";
import ButtonCta from "../ui/button-cta";
function Header() {
  return (
    <header className="flex absolute top-0 left-0 w-full justify-between items-center p-[2rem]">
      <h1 className="flex items-center text-[2.4rem] relative">
        <img src="./logo.png" className="w-[3.5rem] h-auto" />
        TeoChat
        <span className=" inline-block w-[0.8rem] absolute -right-[1rem] bottom-[0.7rem] h-[0.8rem] rounded-full bg-main-color">
          &nbsp;
        </span>
      </h1>
      <ButtonCta>
        Começar Agora <ArrowRight size={18} />
      </ButtonCta>
    </header>
  );
}

export default Header;
