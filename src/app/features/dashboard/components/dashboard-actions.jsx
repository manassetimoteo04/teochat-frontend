import Button from "../../../shared/ui/button";

function DashboardActions() {
  return (
    <div className="p-[4rem_2rem] flex items-center flex-col gap-[4rem] min-w-[45rem]">
      <div className=" flex items-center flex-col ">
        <h2 className="text-[2.4rem] font-[600]">O que desejas Fazer?</h2>
        <span className="text-secondary-text-color text-center">
          Selecione a acção que deseja executar
        </span>
      </div>
      <div className="flex justify-center w-full gap-[1rem]">
        <Button className="bg-green-500 hover:bg-green-600 w-full p-[0.8rem_1.5rem] rounded-full">
          Criar Equipe
        </Button>
        <Button className="bg-green-500 hover:bg-green-600 w-full p-[0.8rem_1.5rem] rounded-full">
          Convidar Membro
        </Button>
      </div>
    </div>
  );
}

export default DashboardActions;
