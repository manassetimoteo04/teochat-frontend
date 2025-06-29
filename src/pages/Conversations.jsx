import ConversationDetails from "../components/conversations/ConversationDetails";
import ConversationList from "../components/conversations/ConversationList";
import ConversationMessages from "../components/conversations/ConversationMessages";
import { useCurrentConversation } from "../contexts/ConversationContextProvider";
import EmptyBox from "../ui/EmptyBox";
import Modal from "../ui/Modal";

function Conversations() {
  const { currentConversation, conversationDetails } = useCurrentConversation();

  return (
    <Modal>
      <ConversationList />
      {!currentConversation && <EmptyBox />}
      {currentConversation && <ConversationMessages />}
      {conversationDetails && <ConversationDetails />}
    </Modal>
  );
}

export default Conversations;
