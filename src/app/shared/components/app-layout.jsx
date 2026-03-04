import { useEffect, useState } from "react";
import Header from "./header";
import Main from "./main";
import Sidebar from "./sidebar";
import { useNavigate, useParams } from "react-router-dom";
import {
  ensureSocketConnected,
  getSocket,
} from "../services/socket-client";
import { toast } from "sonner";
import { MessageCircle } from "lucide-react";

const socket = getSocket();

function AppLayout() {
  const [sidebar, setSidebar] = useState(false);
  const { companyId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!companyId) return;

    const client = ensureSocketConnected();

    const joinCompanyChannels = () => {
      client.emit("channel:join", { companyId });
    };

    joinCompanyChannels();
    client.on("connect", joinCompanyChannels);

    return () => {
      client.off("connect", joinCompanyChannels);
      client.emit("channel:leave");
    };
  }, [companyId]);

  useEffect(() => {
    if (!companyId) return;

    const onNewChannelMessage = (channel) => {
      toast(channel.name, {
        description: (
          <div className="flex flex-col gap-1">
            <span>
              <strong>{channel.lastMessage.name}</strong>
            </span>

            <span className="opacity-80">{channel.lastMessage.content}</span>
          </div>
        ),
        icon: <MessageCircle />,

        action: {
          label: "Abrir",
          onClick: () => {
            navigate(`/${companyId}/chats/${channel.teamId}#${channel.id}`);
          },
        },

        duration: 8000,
      });
    };

    socket.on("channel:new-msg", onNewChannelMessage);

    return () => {
      socket.off("channel:new-msg", onNewChannelMessage);
    };
  }, [companyId, navigate]);

  return (
    <div className="grid lg:grid-cols-[30rem_1fr] max-w-[180rem] border-x mx-auto grid-rows-[5.5rem_1fr] h-[100dvh]">
      <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
      <Main />
      <Header sidebar={sidebar} setSidebar={setSidebar} />
    </div>
  );
}

export default AppLayout;
