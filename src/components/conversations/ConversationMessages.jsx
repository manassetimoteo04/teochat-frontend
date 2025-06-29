import ConversationMessagesHeader from "./ConversationMessagesHeader";
import ConversationMessagesList from "./ConversationMessagesList";
import ConversationMessagesForm from "./ConversationMessagesForm";
import { useCurrentConversation } from "../../contexts/ConversationContextProvider";
import clsx from "clsx";

function ConversationMessages() {
  const { currentConversation, conversationDetails } = useCurrentConversation();
  return (
    <div
      className={`lg:grid fixed sm:relative translate-x-[-100%] z-[99999999999] stop-0 left-0 w-full h-[100dvh]   md:relative md:grid-rows-[1fr_6.7rem] ${
        currentConversation ? "translate-x-[0]" : ""
      } ${conversationDetails ? clsx`sm:hidden hidden` : clsx`lg:block`}`}
    >
      <ConversationMessagesHeader />
      <ConversationMessagesList />
      <ConversationMessagesForm />
    </div>
  );
}

export default ConversationMessages;
