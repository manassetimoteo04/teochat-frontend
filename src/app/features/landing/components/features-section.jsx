import {
  BellIcon,
  CalendarDays,
  MessageCircle,
  Phone,
  Text,
  Users,
} from "lucide-react";
import Heading from "../ui/heading";
import FeatureBox from "../ui/feature-box";
function FeaturesSection() {
  return (
    <section className="flex flex-col gap-[6rem] pt-0 pb-[16rem] px-[2rem] max-w-[120rem]  m-[0_auto]">
      <Heading description="As funcionalidades principais da nossa aplicação">
        Funcionalidades
      </Heading>
      <div className="grid gap-[3rem] md:grid-cols-3 sm:grid-cols-2">
        <FeatureBox
          icon={<CalendarDays />}
          title="Gestão de Eventos"
          description="Gerenciamento de eventos globais e de equipes"
        />
        <FeatureBox
          icon={<Phone />}
          title="Chamadas Integradas"
          description="Chamadas de áudio ou video intregados, separado por salas"
        />{" "}
        <FeatureBox
          icon={<MessageCircle />}
          title="Mensagens"
          description="Mensagems em tempo real entre membros de uma equipa"
        />{" "}
        <FeatureBox
          icon={<Users />}
          title="Gestão de Funcionários"
          description="Gerenciamento de todos os funcionários da empresa"
        />
        <FeatureBox
          icon={<Text />}
          title="Gestão de Tarefas"
          description="Marcação e gestão de tarefas, com atribuição de deadlines"
        />
        <FeatureBox
          icon={<BellIcon />}
          title="Notificações"
          description="Envios de notificações automáticas em tempo real e por e-mails ou push"
        />
      </div>
    </section>
  );
}

export default FeaturesSection;
