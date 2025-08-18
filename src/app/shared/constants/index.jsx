import {
  CalendarDaysIcon,
  HomeIcon,
  MessageCircleIcon,
  Phone,
  Settings2Icon,
  Smartphone,
  UsersIcon,
} from "lucide-react";

export const NavListItems = [
  {
    title: "Início",
    to: "/app/dashboard",
    icon: <HomeIcon />,
  },
  {
    title: "Teams",
    isCollapseble: true,
    childs: [
      { title: "Marketing Digital", to: "teams/" },
      { title: "Dev Luvulo", to: "teams/" },
    ],
    to: "/app/teams",
    icon: <UsersIcon />,
  },
  {
    title: "Chats",
    isCollapseble: true,
    childs: [
      { title: "Marketing Digital", to: "chats/" },
      { title: "Dev Luvulo", to: "chats/" },
    ],
    to: "/app/chats",
    icon: <MessageCircleIcon />,
  },
  {
    title: "Chamadas",
    isCollapseble: true,
    childs: [
      { title: "Marketing Digital", to: "calls/" },
      { title: "Dev Luvulo", to: "calls/" },
    ],
    to: "/app/calls",
    icon: <Smartphone />,
  },
  {
    title: "Agendas",
    isCollapseble: true,
    childs: [
      { title: "Marketing Digital", to: "agendas/" },
      { title: "Dev Luvulo", to: "agendas/" },
    ],
    to: "/app/agendas",
    icon: <CalendarDaysIcon />,
  },
  {
    title: "Configurações",

    to: "/app/configurations",
    icon: <Settings2Icon />,
  },
];
