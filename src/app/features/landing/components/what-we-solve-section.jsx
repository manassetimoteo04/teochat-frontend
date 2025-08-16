import Heading from "../ui/heading";
import ButtonCta from "../ui/button-cta";
import { ArrowRight } from "lucide-react";

function WhatWeSolveSection() {
  return (
    <section className="grid grid-cols-2 max-w-[120rem]  pb-[16rem] px-[2rem]  m-[0_auto]">
      <Heading description="">Problema que Resolvemos</Heading>
      <div className="flex gap-[0.5rem] flex-col">
        <h2 className="text-[2.8rem]">
          Cansado de perder tempo em e-mails e grupos desorganizados?
        </h2>
        <p className="text-secondary-text-color">
          Gerenciar equipes com ferramentas espalhadas é confuso e ineficiente.
          Mensagens se perdem, reuniões atrasam e os prazos estouram. O{" "}
          <span className="text-main-text-color">TeoChat </span>
          resolve isso centralizando tudo em uma única plataforma intuitiva.
        </p>
        <div className="mt-[2rem]">
          <ButtonCta>
            Começar Agora <ArrowRight />
          </ButtonCta>
        </div>
      </div>
    </section>
  );
}
export default WhatWeSolveSection;
