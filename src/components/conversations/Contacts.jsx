import { HiOutlineSearch, HiUserAdd } from "react-icons/hi";
import Heading from "../../ui/Heading";
import ButtonIcon from "../../ui/ButtonIcon";
import {
  HiArrowLeft,
  HiMiniUserGroup,
  HiOutlineEllipsisVertical,
} from "react-icons/hi2";
import ContactBox from "./ContactBox";

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
function Contacts({ onClose: backTo, setCurrent }) {
  return (
    <>
      <header className="p-[0.5rem_1rem] border-b-[1px] flex  justify-between items-center  border-main-border-color dark:border-main-border-color-dark">
        <div className="grid grid-cols-[3rem_1fr] gap-[1rem] items-center">
          <ButtonIcon
            onClick={backTo}
            className="w-[3rem] h-[2.4rem] text-[2rem]"
          >
            <HiArrowLeft />
          </ButtonIcon>
          <div className="flex flex-col justify-center">
            <Heading size="1.6rem">Selecionar Contacto</Heading>
            <span className="text-[1.4rem] text-secondary-text-color dark:text-secondary-text-color-dark">
              142 contactos
            </span>
          </div>
        </div>
        <div className="flex gap-[2rem]">
          <ButtonIcon className="w-[3rem] h-[3rem] text-[2rem]">
            <HiOutlineSearch />
          </ButtonIcon>
          <ButtonIcon className="w-[3rem] h-[3rem] text-[2rem]">
            <HiOutlineEllipsisVertical />
          </ButtonIcon>
        </div>
      </header>
      <div className="flex flex-col ">
        <button
          onClick={() => setCurrent("create-contact")}
          className=" p-[1rem_2rem] hover:bg-gray-200 dark:hover:bg-slate-800/50 flex gap-6 items-center"
        >
          <span className=" w-[4rem] h-[4rem] text-[2.4rem] flex items-center justify-center rounded-full bg-amber-200">
            <HiUserAdd />
          </span>
          <span className="font-bold  dark:text-main-text-color-dark  text-main-text-color">
            Novo contacto
          </span>
        </button>
        <button
          onClick={() => setCurrent("create-group")}
          className=" p-[1rem_2rem] hover:bg-gray-200 dark:hover:bg-slate-800/50 flex gap-6 items-center"
        >
          <span className="  w-[4rem] h-[4rem] text-[2.4rem] flex items-center justify-center rounded-full bg-amber-200">
            <HiMiniUserGroup />
          </span>
          <span className="font-bold   dark:text-main-text-color-dark  text-main-text-color">
            Novo grupo
          </span>
        </button>
      </div>
      <div className="p-[1rem]">
        <span className="px-[1rem] font-semibold text-[1.2rem] text-secondary-text-color dark:text-secondary-text-color-dark">
          Contactos no Teochat
        </span>
        <div>
          {contacts.map((contact) => (
            <ContactBox contact={contact} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Contacts;
