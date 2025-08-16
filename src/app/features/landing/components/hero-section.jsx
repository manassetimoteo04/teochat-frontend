import { ArrowDown } from "lucide-react";
import ButtonCta from "../ui/button-cta";
import Header from "./header";

function HeroSection() {
  return (
    <div className="relative w-full h-screen bg-gray-50 overflow-hidden">
      <div
        className="w-[90dvw] z-[0] absolute -top-[50dvw] left-1/2 -translate-x-1/2 opacity-[0.4] h-[100dvw] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgb(255, 243, 205) 0%, rgba(200, 200, 200, 0.178) 40%, rgba(200,200,200,0) 100%)",
        }}
      ></div>

      <div
        className="absolute z-[0] inset-0 bg-repeat opacity-50 pointer-events-none"
        style={{
          backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><path d="M100 0 L0 0 0 100" fill="none" stroke="%23d1d5db" stroke-width="1"/></svg>')`,
        }}
      />
      <Header />
      <div className="flex absolute gap-[2rem] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2  flex-col items-center h-[50%] z-10 justify-center">
        <h1 class="text-[4.5rem] text-center w-[65rem] font-bold bg-gradient-to-b from-gray-500 to-black bg-clip-text text-transparent">
          Transforme a{" "}
          <span className="text-green-500 bg-gradient-to-b from-green-50 to-green-800 inline-block bg-clip-text">
            Comunicação
          </span>{" "}
          da sua{" "}
          <span className="text-green-500 bg-gradient-to-b from-green-500 to-green-800 inline-block bg-clip-text">
            Equipe
          </span>
        </h1>
        <p className="text-secondary-text-color text-center max-w-[60rem]">
          Um espaço completo para mensagens, chamadas, agenda e colaboração —
          tudo em um só lugar. Diga adeus à confusão de e-mails e grupos
          dispersos.
        </p>
        <ButtonCta variarion="secondary">Criar Empresa</ButtonCta>
        <div>
          <span className="animate-bounce text-secondary-text-color cursor-pointer hover:bg-green-500 hover:text-white  mt-[2rem] w-[3rem] h-[3rem] bg-gray-200 flex items-center justify-center rounded-full">
            <ArrowDown size={20} />
          </span>
        </div>
      </div>
      <div className="absolute bottom-0 w-full h-[10rem] bg-gradient-to-t from-gray-50 to-transparent"></div>
    </div>
  );
}

export default HeroSection;
