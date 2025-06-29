import { useState } from "react";
import Contacts from "./Contacts";
import CreateContactForm from "./CreateContactForm";
import CreateGroups from "./CreateGroups";

function CreateConversation({ onClose }) {
  const [current, setCurrent] = useState("");
  return (
    <div className=" h-[100dvh] w-[100vw] sm:max-w-[48rem] sm:h-auto sm:max-h-[60rem]  flex flex-col minw">
      {!current && <Contacts onClose={onClose} setCurrent={setCurrent} />}
      {current === "create-contact" && (
        <CreateContactForm onBack={setCurrent} />
      )}{" "}
      {current === "create-group" && <CreateGroups onBack={setCurrent} />}
    </div>
  );
}

export default CreateConversation;
