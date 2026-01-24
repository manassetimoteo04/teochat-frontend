import { ChatChannels } from "../components/chat-channels/chat-channels";

function ChatsPage() {
  return (
    <div className="grid grid-cols-[25em_1fr]">
      <ChatChannels />
    </div>
  );
}

export default ChatsPage;
