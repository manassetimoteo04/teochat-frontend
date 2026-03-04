import {
  CalendarDaysIcon,
  Folder,
  HomeIcon,
  MessageCircleIcon,
  Phone,
  Settings2Icon,
  Smartphone,
  UsersIcon,
  Video,
} from "lucide-react";

export const NavListItems = [
  {
    title: "Início",
    to: "/app/dashboard",
    icon: <HomeIcon />,
  },
  {
    title: "Equipas",
    isCollapseble: true,
    childs: [
      { title: "Marketing Digital", to: "teams/" },
      { title: "Dev Luvulo", to: "teams/" },
    ],
    to: "/app/teams",
    icon: <UsersIcon />,
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
    title: "Projectos",
    isCollapseble: true,
    childs: [
      { title: "Marketing Digital", to: "teams/" },
      { title: "Dev Luvulo", to: "teams/" },
    ],
    to: "/app/projects",
    icon: <Folder />,
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
    title: "Meetings",
    isCollapseble: true,
    childs: [
      { title: "Marketing Digital", to: "mettings/" },
      { title: "Dev Luvulo", to: "meetings/" },
    ],
    to: "/app/meetings",
    icon: <Video />,
  },

  {
    title: "Configurações",

    to: "/app/configurations",
    icon: <Settings2Icon />,
  },
];
