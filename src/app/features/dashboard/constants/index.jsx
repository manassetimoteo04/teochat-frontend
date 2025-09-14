import { CalendarDays, ChartColumn, User, Users } from "lucide-react";

export const statsItems = [
  {
    title: "Membros Activos",
    value: 120,
    change: "+10%",
    icon: <User size={20} />,
    color: "text-blue-600",
  },
  {
    title: "Equipes Activas",
    value: 14,
    change: "+35%",
    icon: <Users size={20} />,
    color: "text-green-600",
  },
  {
    title: "Eventos Próximos",
    value: 120,
    change: "+15%",
    icon: <CalendarDays size={20} />,
    color: "text-red-600",
  },
  {
    title: " Productividade",
    value: "70%",
    change: "+10% ",
    icon: <ChartColumn size={20} />,
    color: "text-gray-600",
  },
];
