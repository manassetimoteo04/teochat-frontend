import { ArrowRight } from "lucide-react";
import ButtonCta from "../ui/button-cta";
import { useNavigate } from "react-router-dom";
import Logo from "../../../shared/ui/logo";
function Header() {
  const navigate = useNavigate();
  return (
    <header className="flex absolute top-0 left-0 w-full justify-between items-center p-[2rem]">
      <Logo />
      <ButtonCta onClick={() => navigate("/sign-in")}>
        Começar Agora <ArrowRight size={18} />
      </ButtonCta>{" "}
    </header>
  );
}

export default Header;
