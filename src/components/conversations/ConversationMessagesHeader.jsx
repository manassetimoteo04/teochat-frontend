import {
  HiArrowLeft,
  HiOutlineEllipsisVertical,
  HiOutlinePhone,
  HiOutlineVideoCamera,
} from "react-icons/hi2";
import { useCurrentConversation } from "../../contexts/ConversationContextProvider";
import Row from "../../ui/Row";
import UserSmallImg from "../../ui/UserSmallImg";
import { chats } from "./ConversationList";
import ButtonIcon from "../../ui/ButtonIcon";

function ConversationMessagesHeader() {
  const {
    currentConversation,
    setCurrentConversation,
    setConversationDetails,
  } = useCurrentConversation();
  const user = chats.find((user) => user.name === currentConversation);
  return (
    <header className=" backdrop-blur-md px-[1rem] gap-[1rem] z-[9999999999] dark:bg-main-bg-color-dark/80 bg-main-bg-color/50 fixed md:absolute h-[6.7rem]  top-0 left-0 w-full  pr-[1rem] border-b-[1px] grid grid-cols-[3rem_1fr] md:flex  items-center border-main-border-color dark:border-main-border-color-dark ">
      <ButtonIcon
        hidden="md:hidden"
        onClick={() => setCurrentConversation(null)}
      >
        <HiArrowLeft />
      </ButtonIcon>
      <div className=" flex justify-between items-center w-full h-full">
        <div
          className={`grid hover:cursor-pointer rounded-lg items-center  gap-[1px] grid-cols-[5rem_1fr] 
            `}
        >
          <UserSmallImg url={user.img} alt={user.name} />
          <div className="flex flex-col  justify-center">
            <p className="font-[600] text-[1.4rem] text-main-text-color dark:text-main-text-color-dark">
              {user.name}
            </p>
            <span className="text-secondary-text-color dark:text-secondary-text-color-dark text-[1.2rem]">
              Online as {user.time}
            </span>
          </div>
        </div>
        <div className="flex gap-[2rem] text-[2.4rem] text-gray-500">
          <ButtonIcon>
            <HiOutlineVideoCamera />
          </ButtonIcon>{" "}
          <ButtonIcon>
            <HiOutlinePhone />
          </ButtonIcon>{" "}
          <ButtonIcon onClick={() => setConversationDetails(true)}>
            <HiOutlineEllipsisVertical />
          </ButtonIcon>
        </div>
      </div>
    </header>
  );
}

export default ConversationMessagesHeader;
