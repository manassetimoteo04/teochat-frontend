import Button from "../../../shared/ui/button";
import Input from "../../../shared/ui/input";

function DashboardInviteMember() {
  return (
    <div className="p-[4rem_2rem] flex items-center flex-col gap-[4rem] max-w-[45rem]">
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
        <Input label="Digite o email" type="email" />
      </div>
      <div className="flex justify-center w-full gap-[1rem]">
        <Button className="bg-green-500 hover:bg-green-600 w-full p-[0.8rem_1.5rem] rounded-full">
          Enviar Convite
        </Button>
      </div>
    </div>
  );
}

export default DashboardInviteMember;
