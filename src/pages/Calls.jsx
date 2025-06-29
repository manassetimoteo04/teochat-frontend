import CallsList from "../components/calls/CallsList";
import Modal from "../ui/Modal";
import EmptyBox from "../ui/EmptyBox";
function Calls() {
  return (
    <Modal>
      <CallsList />
      <EmptyBox />
    </Modal>
  );
}

export default Calls;
