import { Plus } from "lucide-react";
import { ChannelItem } from "./channel-item";
import { useListChannelsByTeam } from "../../hooks/use-list-channels-by-team";
import Modal from "../../../../shared/ui/modal";
import { CreateChannelForm } from "./create-channel-form";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../../shared/ui/Spinner";

const fakeChannels = [
  {
    id: "65f1a1b2c3d4e5f001",
    teamId: "6974ec2663b03914cec24b27",
    name: "general",
    description: "Canal geral da equipa",
    isArchived: false,

    lastMessage: {
      id: "msg001",
      content: "Bom dia equipa 👋",
      senderId: "65f1a1b2c3d4e5f900",
      senderName: "Timóteo",
      createdAt: "2026-01-24T08:12:00.000Z",
    },

    createdAt: "2026-01-20T09:15:00.000Z",
    updatedAt: "2026-01-24T08:12:00.000Z",
  },
  {
    id: "65f1a1b2c3d4e5f002",
    teamId: "6974ec2663b03914cec24b27",
    name: "frontend",
    description: "Discussões sobre UI e React",
    isArchived: false,

    lastMessage: {
      id: "msg002",
      content: "Já subi o layout novo 🎨",
      senderId: "65f1a1b2c3d4e5f901",
      senderName: "Ana",
      createdAt: "2026-01-23T18:40:00.000Z",
    },

    createdAt: "2026-01-20T10:00:00.000Z",
    updatedAt: "2026-01-23T18:40:00.000Z",
  },
];

export function Channels() {
  const { data, isPending } = useListChannelsByTeam();
  const navigate = useNavigate();

  return (
    <Modal>
      <div className="py-[2rem] ">
        <header className="px-[2rem] flex justify-between items-center">
          <h4 className="font-semibold text-[1.4rem] text-secondary-text-color">
            Canais
          </h4>
          <Modal.Open id="create-channel">
            <button className="text-secondary-text-color hover:text-main-color ">
              <Plus />
            </button>
          </Modal.Open>
        </header>

        <div className="">
          {!isPending &&
            data.length > 0 &&
            data.map((channel) => (
              <ChannelItem
                onClick={() => navigate(`#${channel.id}`)}
                key={channel.id}
                channel={channel}
              ></ChannelItem>
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

export function ChannelsSkeleton() {
  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="h-5 w-24 rounded bg-gray-300 animate-pulse" />
        <div className="h-6 w-6 rounded-full bg-gray-300 animate-pulse" />
      </div>

      <div className="space-y-5">
        {[1, 2, 3].map((item) => (
          <div key={item} className="flex justify-between items-start">
            <div className="space-y-2">
              <div className="h-6 w-28 rounded bg-gray-300 animate-pulse" />
              <div className="h-3 w-48 rounded bg-gray-300 animate-pulse" />
            </div>

            <div className="h-3 w-10 rounded bg-gray-300 animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
