import { HiOutlinePencilSquare } from "react-icons/hi2";
import Row from "../ui/Row";
import SearchInput from "../ui/SearchInput";
import { HiOutlineFilter } from "react-icons/hi";
import ConversationBox from "./ConversationBox";
const chats = [
  {
    name: "Alice Johnson",
    img: "https://randomuser.me/api/portraits/women/10.jpg",
    time: "8:45 AM",
    message: "Good luck today!",
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
  return (
    <div className="bg-white">
      <header className="p-[2rem] ">
        <div className="flex justify-between items-center mb-[1rem]">
          <h3 className="text-[2.4rem] font-semibold">Conversas</h3>
          <div className=" flex items-center gap-8 text-[2.4rem] text-gray-500 ">
            <span className=" cursor-pointer hover:text-gray-700">
              <HiOutlinePencilSquare />
            </span>
            <span className=" cursor-pointer hover:text-gray-700">
              <HiOutlineFilter />
            </span>
          </div>
        </div>
        <SearchInput />
      </header>
      <div className="p-[0_2rem] h-[calc(100vh-126px)] overflow-y-scroll">
        {chats.map((conv) => (
          <ConversationBox conv={conv} />
        ))}
      </div>
    </div>
  );
}

export default ConversationList;
