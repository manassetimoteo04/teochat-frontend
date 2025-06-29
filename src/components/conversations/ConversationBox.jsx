import clsx from "clsx";
import UserSmallImg from "../../ui/UserSmallImg";
import { useCurrentConversation } from "../../contexts/ConversationContextProvider";

function ConversationBox({ conv }) {
  const { setCurrentConversation, currentConversation } =
    useCurrentConversation();
  return (
    <div
      onClick={() => setCurrentConversation(conv.name)}
      className={`fadeInAnimation grid dark:hover:bg-slate-800/50 hover:bg-gray-100 rounded-lg items-center p-4  gap-5 md:gap-4 md:grid-cols-[5rem_1fr] grid-cols-[3.5rem_1fr]
        ${
          currentConversation === conv.name
            ? clsx` bg-gray-100  dark:bg-slate-800/50`
            : ""
        }`}
    >
      <UserSmallImg url={conv.img} alt={conv.name} />
      <div className="flex flex-col  justify-center">
        <div className="flex justify-between items-center">
          <p className="font-[500] text-main-text-color  dark:text-main-text-color-dark">
            {conv.name}
          </p>
          <span className="text-secondary-text-color  dark:text-secondary-text-color-dark text-[1.4rem]">
            {conv.time}
          </span>
        </div>
        <div>
          <span className="text-secondary-text-color dark:text-secondary-text-color-dark text-[1.4rem]">
            {conv.message}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ConversationBox;
