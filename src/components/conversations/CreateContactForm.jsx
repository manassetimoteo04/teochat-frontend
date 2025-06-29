import { HiArrowLeft, HiOutlineMail, HiOutlineSearch } from "react-icons/hi";
import { HiOutlineQrCode, HiOutlineUser } from "react-icons/hi2";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import ButtonIcon from "../../ui/ButtonIcon";
import Heading from "../../ui/Heading";

function CreateContactForm({ onBack }) {
  return (
    <div className="flex flex-col">
      <header className="p-[1.5rem] border-b-[1px] border-main-border-color dark:border-main-border-color-dark flex  justify-between items-center  ">
        <div className="grid grid-cols-[3rem_1fr] gap-[1rem] items-center">
          <ButtonIcon
            onClick={() => onBack(null)}
            className="w-[3rem] h-[2.4rem] text-[2rem]"
          >
            <HiArrowLeft />
          </ButtonIcon>
          <div className="flex flex-col justify-center">
            <Heading size="2rem" className="text-[2rem] font-semibold">
              Adicionar Contacto
            </Heading>
          </div>
        </div>
        <div className="flex">
          <ButtonIcon className="w-[3rem] h-[3rem] text-[2rem]">
            <HiOutlineQrCode />
          </ButtonIcon>
        </div>
      </header>

      <form action="" className="p-[2rem] flex flex-col gap-[2rem]">
        <div
          className="rounded-[0.6rem] 
      w-full  items-center grid grid-cols-[3.5rem_1fr]"
        >
          <span className="text-[2.4rem] text-gray-600">
            <HiOutlineMail />
          </span>
          <Input type="email" placeholder="contact@example.me" />
        </div>
        <div
          className="rounded-[0.6rem] 
      w-full items-center grid grid-cols-[3.5rem_1fr]"
        >
          <span className="text-[2.4rem] text-gray-600">
            <HiOutlineUser />
          </span>
          <Input placeholder="Wesley Smith" type="text" />
        </div>

        <Button>Adicionar Contacto</Button>
      </form>
    </div>
  );
}

export default CreateContactForm;
