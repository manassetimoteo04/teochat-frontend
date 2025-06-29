import {
  HiArrowLeft,
  HiOutlineSearch,
  HiOutlineUserGroup,
} from "react-icons/hi";
import ContactBox from "./ContactBox";
import ButtonIcon from "../../ui/ButtonIcon";
import Heading from "../../ui/Heading";
import Input from "../../ui/Input";
const contacts = [
  {
    name: "Mason Carter",
    img: "https://randomuser.me/api/portraits/men/34.jpg",
    bio: "Continue vendo...",
  },
  {
    name: "Olivia Wells",
    img: "https://randomuser.me/api/portraits/women/35.jpg",
    bio: "Dev",
  },
  {
    name: "Ethan Turner",
    img: "https://randomuser.me/api/portraits/men/36.jpg",
    bio: "God on first place",
  },
];
function CreateGroups({ onBack }) {
  return (
    <div>
      <header className="p-[0.5rem_1rem] border-b-[1px] flex  justify-between items-center  border-main-border-color dark:border-main-border-color-dark">
        <div className="grid grid-cols-[4rem_1fr] items-center">
          <ButtonIcon
            onClick={() => onBack(null)}
            className="w-[3rem] h-[2.4rem] text-[2rem]"
          >
            <HiArrowLeft />
          </ButtonIcon>
          <div className="flex flex-col justify-center">
            <Heading size="1.6rem">Criar novo Grupo</Heading>
            <span className="text-[1.4rem] text-secondary-text-color dark:text-secondary-text-color-dark">
              Nenhum contacto selecionado
            </span>
          </div>
        </div>
        <div className="flex">
          <ButtonIcon className="w-[3rem] h-[3rem] text-[2rem]">
            <HiOutlineSearch />
          </ButtonIcon>
        </div>
      </header>

      <form action="" className="p-[2rem] flex flex-col gap-[2rem]">
        <div
          className="rounded-[0.6rem] 
            w-full  items-center grid grid-cols-[3.5rem_1fr]"
        >
          <span className="text-[2.4rem] text-secondary-text-color dark:text-secondary-text-color-dark">
            <HiOutlineUserGroup />
          </span>
          <Input type="text" placeholder="Nome do Grupo" />
        </div>
        <div className="">
          <span className="px-[1rem] font-semibold text-[1.2rem] text-secondary-text-color dark:text-secondary-text-color-dark">
            Contactos no Teochat
          </span>
          <div>
            {contacts.map((contact) => (
              <ContactBox contact={contact} />
            ))}
          </div>
        </div>
        <button className="bg-amber-200 p-[1.5rem] rounded-full text-[1.6rem] font-bold">
          Adicionar Contacto
        </button>
      </form>
    </div>
  );
}

export default CreateGroups;
