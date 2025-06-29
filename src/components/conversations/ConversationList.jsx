import {
  HiOutlineEllipsisVertical,
  HiOutlinePencilSquare,
} from "react-icons/hi2";
import SearchInput from "../../ui/SearchInput";
import ConversationBox from "./ConversationBox";
import Modal from "../../ui/Modal";
import CreateConversation from "./CreateConversation";
import Heading from "../../ui/Heading";
import { useCurrentConversation } from "../../contexts/ConversationContextProvider";
import clsx from "clsx";
import { chats } from "../../utils/helpers";

function ConversationList() {
  const { currentConversation } = useCurrentConversation();
  return (
    <div
      className={`bg-main-bg-color-2 dark:bg-main-bg-color-dark-2 border-r-[1px] dark:border-main-border-color-dark  border-main-border-color ${
        currentConversation ? clsx`sm:hidden md:block` : ""
      }`}
    >
      <header className="p-[1rem_2rem] ">
        <div className="flex justify-between  items-center mb-[2rem]">
          <Heading>Conversas</Heading>
          <div className=" flex items-center gap-8 text-[2.4rem] text-secondary-text-color dark:text-secondary-text-color-dark ">
            <Modal.Open opens="create-conversation">
              <span className=" cursor-pointer hover:text-gray-700">
                <HiOutlinePencilSquare />
              </span>
            </Modal.Open>
            <span className=" cursor-pointer  hover:text-gray-700">
              <HiOutlineEllipsisVertical />
            </span>
          </div>
        </div>
        <SearchInput />
      </header>
      <div className="p-[0_0.5rem] pb-[10rem] flex flex-col gap-1 h-[calc(100dvh-116px)] overflow-y-scroll">
        {chats.map((conv) => (
          <ConversationBox conv={conv} />
        ))}
      </div>

      <Modal.Window name="create-conversation">
        <CreateConversation />
      </Modal.Window>
    </div>
  );
}

export default ConversationList;
