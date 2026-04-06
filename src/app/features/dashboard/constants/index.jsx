import {
  CalendarDays,
  ChartColumn,
  FolderCheck,
  User,
  Users,
} from "lucide-react";

export const statsItems = [
  {
    title: "Membros Activos",
    value: 120,
    key: "members",
    change: "+10%",
    icon: <User size={25} />,
    color: "text-blue-600",
  },
  {
    title: "Equipes Activas",
    value: 14,
    key: "teams",
    change: "+35%",
    icon: <Users size={25} />,
    color: "text-green-600",
  },
  {
    title: "Eventos Agendados",
    value: 120,
    change: "+15%",
    key: "events",
    icon: <CalendarDays size={25} />,
    color: "text-red-600",
  },
  {
    title: "Eventos Futuros",
    value: 0,
    change: "",
    key: "upcomingEvents",
    icon: <CalendarDays size={25} />,
    color: "text-orange-600",
  },
  {
    title: "Equipes com Membros",
    value: 0,
    change: "",
    key: "teamsWithMembers",
    icon: <Users size={25} />,
    color: "text-emerald-600",
  },
  {
    title: "Projectos Activos",
    value: "70",
    change: "+10% ",
    icon: <FolderCheck size={25} />,
    color: "text-gray-600",
  },
];

export const memberStatsItems = [
  {
    title: "Minhas Equipas",
    value: 0,
    key: "myTeams",
    change: "",
    icon: <Users size={25} />,
    color: "text-green-600",
  },
  {
    title: "Meus Eventos",
    value: 0,
    key: "myEvents",
    change: "",
    icon: <CalendarDays size={25} />,
    color: "text-red-600",
  },
];
