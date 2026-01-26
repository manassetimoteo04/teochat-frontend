import { useCallback, useEffect, useState } from "react";
import Header from "./header";
import Main from "./main";
import Sidebar from "./sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { getSocket } from "../services/socket-client";
import { toast } from "sonner";
import { MessageCircle } from "lucide-react";
const socket = getSocket();
function AppLayout() {
  const [sidebar, setSidebar] = useState(false);
  const { companyId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (!companyId) return;
    socket.emit("channel:join", { companyId });
    return () => {
      socket.emit("channel:leave");
    };
  }, [companyId]);

  useEffect(() => {
    const onNewChannelMessage = (channel) => {
      // if (channel.id === currentChannelRef.current) return;
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
