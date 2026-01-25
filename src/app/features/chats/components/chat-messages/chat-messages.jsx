import { useState } from "react";
import Spinner from "../../../../shared/ui/Spinner";
import { useGetChannelById } from "../../hooks/use-get-channel-by-id";
import { ChannelNotFound } from "./channell-not-found";
import { ChatHeader } from "./chat-header";
import { ChatMessagesForm } from "./chat-messages-form";
import { ChatMessagesList } from "./chat-messages-list";
import clsx from "clsx";
import { ChatDetails } from "./chat-details";

export function ChatMessages() {
  const { data, isPending } = useGetChannelById();
  const [details, setDetails] = useState(true);
  return (
    <div className={clsx("grid", details && "grid-cols-2")}>
      <div className="bg-white relative grid grid-rows-[5.5rem_1fr]">
        {!isPending && data && (
          <>
            <ChatHeader setDetails={setDetails} data={data} />
            <ChatMessagesList />
            <ChatMessagesForm />
          </>
        )}
        {isPending && (
          <div className="absolute w-full h-full">
            <Spinner />
          </div>
        )}
        {!isPending && !data && <ChannelNotFound />}
      </div>
      {details && data && (
        <ChatDetails setConversationDetails={setDetails} data={data} />
      )}
    </div>
  );
}
