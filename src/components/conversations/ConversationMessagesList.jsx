import { useCurrentConversation } from "../../contexts/ConversationContextProvider";
import { groupMessagesByDate } from "../../utils/helpers";
import MessageBox from "./MessageBox";

// eslint-disable-next-line react-refresh/only-export-components

function ConversationMessagesList() {
  const { conversation } = useCurrentConversation();
  console.log(conversation);
  const list = groupMessagesByDate(conversation);
  return (
    <div className="px-10  pb-[20rem] md:px-[4rem] bg-[#d1d1d1] dark:bg-main-bg-color-dark gap-[1rem] py-[8rem] bg-fixed fixed w-full h-[100dvh] md:relative items-end flex flex-col md:h-[100dvh] overflow-y-scroll">
      <div className="fixed inset-0 dark:bg-[url('/mosaico.png')] bg-[url('/mosaico-light.png')] w-full h-screen opacity-20 dark:opacity-10  bg-repeat bg-repeat pointer-events-none" />

      {list?.map((group) => {
        return (
          <>
            <span className="fadeInAnimation sticky p-[0.5rem_1rem] mt-[1rem] text-secondary-text-color dark:text-secondary-text-color-dark rounded-full text-[1.4rem] self-center bg-main-bg-color/50 backdrop-blur-md  dark:bg-main-bg-color-dark/5">
              {group.date}
            </span>
            {group.messages.map((message, i) => (
              <MessageBox
                message={message}
                index={i}
                date={group.date}
                isBeforeTheSame={(index) => list?.at(index)?.isMine}
              />
            ))}
          </>
        );
      })}
    </div>
  );
}

export default ConversationMessagesList;
