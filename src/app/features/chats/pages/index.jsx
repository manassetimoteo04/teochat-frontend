import { useLocation } from "react-router-dom";
import { ChatChannels } from "../components/chat-channels/chat-channels";
import { ChatMessages } from "../components/chat-messages/chat-messages";
import { EmptyChatSelected } from "../components/chat-messages/chat-not-selected";

function ChatsPage() {
  const { hash } = useLocation();

  return (
    <div className="grid relative md:grid-cols-2 lg:grid-cols-[35rem_1fr]">
      <ChatChannels />
      {hash && <ChatMessages />}
      {!hash && <EmptyChatSelected />}
    </div>
  );
}

export default ChatsPage;
