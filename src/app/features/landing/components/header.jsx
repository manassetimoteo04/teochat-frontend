import Logo from "../../../shared/ui/logo";
import ButtonCta from "../ui/button-cta";
function Header() {
  return (
    <header className="flex absolute top-0 left-0 w-full justify-between items-center p-[2rem]">
      <h1 className="flex ">
        TeoChat
        <span className=" inline-block w-[0.8rem] h-[0.8rem] rounded-full bg-main-color">
          &nbsp;
        </span>
      </h1>
      <ButtonCta>Começar Agora</ButtonCta>
    </header>
  );
}

export default Header;
