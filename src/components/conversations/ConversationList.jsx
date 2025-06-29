import {
  HiOutlineEllipsisVertical,
  HiOutlinePencilSquare,
} from "react-icons/hi2";
import SearchInput from "../../ui/SearchInput";
import ConversationBox from "./ConversationBox";
import Modal from "../../ui/Modal";
import CreateConversation from "./CreateConversation";
import Heading from "../../ui/Heading";
import { useCurrentConversation } from "../../contexts/ConversationContextProvider";
import clsx from "clsx";
// eslint-disable-next-line react-refresh/only-export-components
export const chats = [
  {
    name: "Germina Pembele",
    img: "https://randomuser.me/api/portraits/women/10.jpg",
    time: "8:45 AM",
    message: "Olá como vc está?!",
    read: false,
  },
  {
    name: "Marcus Lee",
    img: "https://randomuser.me/api/portraits/men/11.jpg",
    time: "9:01 AM",
    message: "Check your email.",
    read: true,
  },

  {
    name: "Sarah Kim",
    img: "https://randomuser.me/api/portraits/women/12.jpg",
    time: "9:27 AM",
    message: "I'll be late.",
    read: false,
  },
  {
    name: "Daniel Costa",
    img: "https://randomuser.me/api/portraits/men/13.jpg",
    time: "9:30 AM",
    message: "Where are you?",
    read: true,
  },
  {
    name: "Nina Patel",
    img: "https://randomuser.me/api/portraits/women/14.jpg",
    time: "9:34 AM",
    message: "Got the tickets!",
    read: true,
  },
  {
    name: "Leo Martins",
    img: "https://randomuser.me/api/portraits/men/15.jpg",
    time: "9:45 AM",
    message: "Let me know.",
    read: false,
  },
  {
    name: "Project X Team",
    img: "https://via.placeholder.com/150/4caf50/ffffff?text=PX",
    time: "10:01 AM",
    message: "Meeting link sent.",
    read: true,
  },
  {
    name: "Emily Clark",
    img: "https://randomuser.me/api/portraits/women/16.jpg",
    time: "10:18 AM",
    message: "Awesome work!",
    read: false,
  },
  {
    name: "Ryan Thompson",
    img: "https://randomuser.me/api/portraits/men/17.jpg",
    time: "10:33 AM",
    message: "I'm at the café.",
    read: true,
  },
  {
    name: "Chloe Nguyen",
    img: "https://randomuser.me/api/portraits/women/18.jpg",
    time: "10:59 AM",
    message: "Are we still on?",
    read: false,
  },
  {
    name: "David Smith",
    img: "https://randomuser.me/api/portraits/men/19.jpg",
    time: "11:05 AM",
    message: "New idea incoming!",
    read: true,
  },
  {
    name: "Isabella Lopez",
    img: "https://randomuser.me/api/portraits/women/20.jpg",
    time: "11:20 AM",
    message: "Lunch today?",
    read: false,
  },
  {
    name: "Omar El-Masry",
    img: "https://randomuser.me/api/portraits/men/21.jpg",
    time: "11:45 AM",
    message: "Need your feedback.",
    read: true,
  },
  {
    name: "Group: Creatives",
    img: "https://via.placeholder.com/150/ff9800/ffffff?text=CR",
    time: "12:00 PM",
    message: "Logo finalized 🎉",
    read: true,
  },
  {
    name: "Sofia Renner",
    img: "https://randomuser.me/api/portraits/women/22.jpg",
    time: "12:22 PM",
    message: "Talk later?",
    read: false,
  },
  {
    name: "Jake R.",
    img: "https://randomuser.me/api/portraits/men/23.jpg",
    time: "12:39 PM",
    message: "I'm out front.",
    read: true,
  },
  {
    name: "Emma Green",
    img: "https://randomuser.me/api/portraits/women/24.jpg",
    time: "1:05 PM",
    message: "Sent the docs.",
    read: true,
  },
  {
    name: "Mateo Rossi",
    img: "https://randomuser.me/api/portraits/men/25.jpg",
    time: "1:11 PM",
    message: "Where's the file?",
    read: false,
  },
  {
    name: "Ava Morales",
    img: "https://randomuser.me/api/portraits/women/26.jpg",
    time: "1:23 PM",
    message: "Got it, thanks!",
    read: true,
  },
  {
    name: "Liam Scott",
    img: "https://randomuser.me/api/portraits/men/27.jpg",
    time: "1:47 PM",
    message: "Done!",
    read: true,
  },
  {
    name: "Maya Desai",
    img: "https://randomuser.me/api/portraits/women/28.jpg",
    time: "2:10 PM",
    message: "Yes, please!",
    read: false,
  },
  {
    name: "Zach Bennett",
    img: "https://randomuser.me/api/portraits/men/29.jpg",
    time: "2:19 PM",
    message: "You there?",
    read: false,
  },
  {
    name: "Lily James",
    img: "https://randomuser.me/api/portraits/women/30.jpg",
    time: "2:30 PM",
    message: "Perfect 👌",
    read: true,
  },
  {
    name: "Tommy L.",
    img: "https://randomuser.me/api/portraits/men/31.jpg",
    time: "2:45 PM",
    message: "See you soon!",
    read: false,
  },
  {
    name: "Noah Wilson",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
    time: "3:05 PM",
    message: "Call me?",
    read: true,
  },
  {
    name: "Ella F.",
    img: "https://randomuser.me/api/portraits/women/33.jpg",
    time: "3:17 PM",
    message: "Thanks again!",
    read: true,
  },
  {
    name: "Mason Carter",
    img: "https://randomuser.me/api/portraits/men/34.jpg",
    time: "3:30 PM",
    message: "You're welcome!",
    read: true,
  },
  {
    name: "Olivia Wells",
    img: "https://randomuser.me/api/portraits/women/35.jpg",
    time: "3:44 PM",
    message: "Send it over!",
    read: false,
  },
  {
    name: "Ethan Turner",
    img: "https://randomuser.me/api/portraits/men/36.jpg",
    time: "4:00 PM",
    message: "Cool 😎",
    read: true,
  },
];

function ConversationList() {
  const { currentConversation } = useCurrentConversation();
  return (
    <div
      className={`bg-main-bg-color-2 dark:bg-main-bg-color-dark-2 border-r-[1px] dark:border-main-border-color-dark  border-main-border-color ${
        currentConversation ? clsx`sm:hidden md:block` : ""
      }`}
    >
      <header className="p-[1rem_2rem] ">
        <div className="flex justify-between  items-center mb-[2rem]">
          <Heading>Conversas</Heading>
          <div className=" flex items-center gap-8 text-[2.4rem] text-secondary-text-color dark:text-secondary-text-color-dark ">
            <Modal.Open opens="create-conversation">
              <span className=" cursor-pointer hover:text-gray-700">
                <HiOutlinePencilSquare />
              </span>
            </Modal.Open>
            <span className=" cursor-pointer  hover:text-gray-700">
              <HiOutlineEllipsisVertical />
            </span>
          </div>
        </div>
        <SearchInput />
      </header>
      <div className="p-[0_0.5rem] pb-[10rem] flex flex-col gap-1 h-[calc(100dvh-116px)] overflow-y-scroll">
        {chats.map((conv) => (
          <ConversationBox conv={conv} />
        ))}
      </div>

      <Modal.Window name="create-conversation">
        <CreateConversation />
      </Modal.Window>
    </div>
  );
}

export default ConversationList;
