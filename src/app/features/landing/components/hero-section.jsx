import ButtonCta from "../ui/button-cta";
import Header from "./header";

function HeroSection() {
  return (
    <div className="relative w-full h-screen bg-gray-50 overflow-hidden">
      <div
        className="w-[90dvw] z-[0] absolute -top-[50dvw] left-1/2 -translate-x-1/2 opacity-[0.4] h-[100dvw] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(200,200,200,0.8) 0%, rgba(200,200,200,0.4) 40%, rgba(200,200,200,0) 100%)",
        }}
      ></div>

      <div
        className="absolute z-[0] inset-0 bg-repeat opacity-30 pointer-events-none"
        style={{
          backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><path d="M100 0 L0 0 0 100" fill="none" stroke="%23d1d5db" stroke-width="1"/></svg>')`,
        }}
      />
      <Header />
      <div className="flex absolute gap-[2rem] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2  flex-col items-center h-[50%] z-10 justify-center">
        <h1 class="text-[4.5rem] text-center max-w-[80rem] font-bold bg-gradient-to-b from-gray-500 to-black bg-clip-text text-transparent">
          Transforme a comunicação da sua Equipe
        </h1>
        <p className="text-secondary-text-color text-center max-w-[60rem]">
          Um espaço completo para mensagens, chamadas, agenda e colaboração —
          tudo em um só lugar. Diga adeus à confusão de e-mails e grupos
          dispersos.
        </p>
        <ButtonCta variarion="secondary">Criar Empresa</ButtonCta>
      </div>
    </div>
  );
}

export default HeroSection;
