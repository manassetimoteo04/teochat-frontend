import CallsList from "../components/calls/CallsList";
import Modal from "../ui/Modal";
function Calls() {
  return (
    <Modal>
      <CallsList />
      <EmptyBox />
    </Modal>
  );
}

export default Calls;
