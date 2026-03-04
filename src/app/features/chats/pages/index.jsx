import { useLocation } from "react-router-dom";
import { ChatChannels } from "../components/chat-channels/chat-channels";
import { ChatMessages } from "../components/chat-messages/chat-messages";
import { EmptyChatSelected } from "../components/chat-messages/chat-not-selected";
import clsx from "clsx";

function ChatsPage() {
  const { hash } = useLocation();
  const hasSelectedChat = Boolean(hash);

  return (
    <div className="grid relative md:grid-cols-2 lg:grid-cols-[35rem_1fr] bg-white">
      <div className={clsx(hasSelectedChat && "hidden md:block")}>
        <ChatChannels />
      </div>

      <div className={clsx(!hasSelectedChat && "hidden md:block")}>
        {hasSelectedChat && <ChatMessages />}
        {!hasSelectedChat && <EmptyChatSelected />}
      </div>
    </div>
  );
}

export default ChatsPage;
