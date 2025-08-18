import Heading from "../ui/heading";
import BenefitBox from "../ui/benefit-box";
import { Zap, LayoutGrid, ShieldCheck, Smartphone } from "lucide-react";

const benefits = [
  {
    title: "Mais produtividade",
    description:
      "Chega de reuniões intermináveis e trocas de mensagens confusas. Com o TeoChat, sua equipe ganha mais tempo para o que realmente importa: entregar resultados.",
    icon: <Zap size={40} />,
    color: "text-green-600",
  },
  {
    title: "Mais organização",
    description:
      "Chats, chamadas e eventos em um só lugar. Cada conversa no seu espaço certo, cada tarefa com prazo definido e cada evento na agenda da equipe.",
    icon: <LayoutGrid size={40} />,
    color: "text-blue-600",
  },
  {
    title: "Mais segurança",
    description:
      "Toda a comunicação protegida com criptografia de ponta a ponta. Apenas quem deve ler consegue acessar. Segurança total para sua equipe.",
    icon: <ShieldCheck size={40} />,
    color: "text-red-600",
  },
  {
    title: "Mais flexibilidade",
    description:
      "Use o TeoChat onde estiver: no celular, no desktop ou direto no navegador. Sua equipe sempre conectada, em qualquer lugar.",
    icon: <Smartphone size={40} />,
    color: "text-orange-500",
  },
];

function BenefitsSection() {
  return (
    <section className="flex flex-col gap-[6rem] max-w-[120rem] pb-[16rem] px-[2rem]  m-[0_auto] ">
      <Heading description="Resultados que sua equipe vai sentir no dia a dia">
        Principais Benefícios
      </Heading>
      <div className="grid gap-[3rem]  lg:grid-cols-2">
        {benefits.map((benefit) => (
          <BenefitBox benefit={benefit} key={benefit.title} />
        ))}
      </div>
    </section>
  );
}

export default BenefitsSection;
