import Button from "../../../shared/ui/button";
import Heading from "../../../shared/ui/heading";
import Modal from "../../../shared/ui/modal";

function DashboardActions() {
  return (
    <div className="p-[4rem_2rem] flex items-center flex-col gap-[4rem] sm:min-w-[45rem]">
      <div className=" flex items-center flex-col ">
        <Heading as="h2">O que desejas Fazer?</Heading>
        <span className="text-secondary-text-color text-center">
          Selecione a acção que deseja executar
        </span>
      </div>
      <div className="flex flex-col sm:flex-row justify-center w-full gap-[1rem]">
        <Modal.Open id="create-new-team">
          <Button className="bg-green-500 hover:bg-green-600 w-full p-[0.8rem_1.5rem] rounded-full">
            <span className="hidden sm:inline-block">Criar</span> Equipa
          </Button>
        </Modal.Open>
        <Modal.Open id="invite-new-member">
          <Button className="bg-green-500 hover:bg-green-600 w-full p-[0.8rem_1.5rem] rounded-full">
            <span className="hidden sm:inline-block">Convidar</span> Membro
          </Button>
        </Modal.Open>
      </div>
    </div>
  );
}

export default DashboardActions;
