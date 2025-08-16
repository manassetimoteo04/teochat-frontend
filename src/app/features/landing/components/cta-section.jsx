import Heading from "../ui/heading";

function CtaSection() {
  return (
    <div className="bg-gradient-to-l p-[4rem] from-green-500 to-green-600">
      <section className="max-w-[120rem] m-[0_auto]">
        <header className="max-w-[65rem] m-[0_auto]">
          <h1 class="text-[3.5rem] text-center  font-bold text-white">
            Chegou a hora de levar sua equipe para o próximo nível
          </h1>
        </header>
        <div className="flex justify-center gap-[2rem] items-center max-w-[60rem] m-[0_auto] text-center text-gray-50 flex-col mt-[2rem]">
          <p className="text-center">
            Experimente o <span className="text-white font-[600]">TeoChat</span>{" "}
            gratuitamente e descubra como é fácil se manter organizado e
            produtivo. A comunicação da sua equipe nunca mais será a mesma.
          </p>
          <button className="bg-white p-[1rem_2rem] flex items-center gap-[0.5rem] text-black justify-center hover:bg-green-700 rounded-full">
            Criar a minha empresa
          </button>
        </div>
      </section>
    </div>
  );
}

export default CtaSection;
