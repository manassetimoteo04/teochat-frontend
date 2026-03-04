import { Plus } from "lucide-react";
import { ChannelItem } from "./channel-item";
import { useListChannelsByTeam } from "../../hooks/use-list-channels-by-team";
import Modal from "../../../../shared/ui/modal";
import { CreateChannelForm } from "./create-channel-form";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../../shared/ui/Spinner";
import { useEffect, useMemo, useState } from "react";
import {
  ensureSocketConnected,
  getSocket,
} from "../../../../shared/services/socket-client";

const socket = getSocket();

export function Channels() {
  const { data, isPending } = useListChannelsByTeam();
  const navigate = useNavigate();

  const [realtimeUpdates, setRealtimeUpdates] = useState({});

  useEffect(() => {
    ensureSocketConnected();

    const onChannelUpdate = (payload) => {
      setRealtimeUpdates((prev) => ({
        ...prev,
        [payload.id]: payload,
      }));
    };

    socket.on("channel:new-msg", onChannelUpdate);
    socket.on("channel:new-msg-sent", onChannelUpdate);

    return () => {
      socket.off("channel:new-msg", onChannelUpdate);
      socket.off("channel:new-msg-sent", onChannelUpdate);
    };
  }, []);

  const channels = useMemo(() => {
    if (!data) return [];

    const map = new Map();

    data.forEach((channel) => {
      map.set(channel.id, channel);
    });

    Object.values(realtimeUpdates).forEach((channel) => {
      map.set(channel.id, channel);
    });

    return Array.from(map.values()).sort((a, b) => {
      const da = new Date(a?.lastMessage?.date || 0);
      const db = new Date(b?.lastMessage?.date || 0);
      return db - da;
    });
  }, [data, realtimeUpdates]);

  return (
    <Modal>
      <div className="py-[2rem] h-[calc(100dvh-12.5rem)] overflow-y-scroll bg-white">
        <header className="px-[2rem] flex justify-between items-center">
          <h4 className="font-semibold text-[1.4rem] text-secondary-text-color">
            Canais
          </h4>

          <Modal.Open id="create-channel">
            <button className="text-secondary-text-color hover:text-main-color">
              <Plus />
            </button>
          </Modal.Open>
        </header>

        <div>
          {!isPending &&
            channels.map((channel) => (
              <ChannelItem
                key={channel.id}
                channel={channel}
                onClick={() => navigate(`#${channel.id}`)}
              />
            ))}

          {isPending && <Spinner />}
        </div>
      </div>

      <Modal.Window id="create-channel">
        <CreateChannelForm />
      </Modal.Window>
    </Modal>
  );
}
