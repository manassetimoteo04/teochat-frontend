import { useState } from "react";
import Button from "../../../shared/ui/button";
import Input from "../../../shared/ui/input";
import SpinnerMini from "../../../shared/ui/SpinnerMini";
import { useInviteMember } from "../../companies/hooks/use-invite-member";
import { toast } from "sonner";

function DashboardInviteMember() {
  const { sendInvite, isPending } = useInviteMember();
  const [emails, setEmails] = useState();
  const onSubmit = (e) => {
    e.preventDefault();
    if (!emails) return toast.warning("Por favor, digite pelo menos um email");

    sendInvite({ emails });
  };
  return (
    <form
      onSubmit={onSubmit}
      className="p-[4rem_2rem] flex items-center flex-col gap-[4rem] max-w-[45rem]"
    >
      <div className=" flex items-center flex-col ">
        <h2 className="text-[2.4rem] font-[600]">
          Enviar Convite para de Adesão{" "}
        </h2>
        <span className="text-secondary-text-color text-center">
          Digite o email correctamente de quem desejas convidar a participar na
          tua empresa
        </span>
      </div>
      <div className="flex w-full">
        <Input
          value={emails}
          setValue={setEmails}
          label="Digite o email"
          type="email"
        />
      </div>
      <div className="flex justify-center w-full gap-[1rem]">
        <Button className="bg-green-500 hover:bg-green-600 w-full p-[0.8rem_1.5rem] rounded-full">
          {isPending ? <SpinnerMini /> : "Enviar Convite"}
        </Button>
      </div>
    </form>
  );
}

export default DashboardInviteMember;
