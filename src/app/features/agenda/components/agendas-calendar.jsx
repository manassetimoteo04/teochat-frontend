import Calendar from "../../../shared/components/calendar/calendar";

function AgendasCalendar() {
  return (
    <div className="bg-main-bg-color-2 border-t border-gray-100">
      <Calendar />
    </div>
  );
}

export default AgendasCalendar;

//     <main className="flex-1 p-4 overflow-y-auto">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-lg font-medium">Setembro 2025</h2>
//         <div className="flex gap-2">
//           <button className="px-3 py-1 border rounded-lg">Mês</button>
//           <button className="px-3 py-1 border rounded-lg">Semana</button>
//           <button className="px-3 py-1 border rounded-lg">Dia</button>
//           <button className="px-3 py-1 border rounded-lg">Lista</button>
//         </div>
//       </div>

//       <div className="grid grid-cols-7 gap-2">
//         {Array.from({ length: 28 }).map((_, i) => (
//           <div
//             key={i}
//             className="h-28 border rounded-lg p-1 flex flex-col text-xs"
//           >
//             <span className="text-gray-500">{i + 1}</span>
//             {i === 2 && (
//               <div className="mt-1 p-1 text-white bg-blue-500 rounded">
//                 Reunião
//               </div>
//             )}
//             {i === 5 && (
//               <div className="mt-1 p-1 text-white bg-red-500 rounded">
//                 Deadline
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </main>

//      <aside className="w-1/4 border-l p-4 bg-white">
//       <h2 className="font-medium mb-2">Detalhes do evento</h2>
//       <div className="p-3 border rounded-lg">
//         <p className="font-semibold">Reunião de Planejamento</p>
//         <p className="text-sm text-gray-500">Hoje - 15:00</p>
//         <p className="mt-2 text-sm">
//           Discussão sobre as prioridades da sprint atual.
//         </p>

//         <div className="mt-3">
//           <p className="text-sm font-medium">Participantes:</p>
//           <ul className="flex gap-2 mt-1">
//             <img
//               src="/default-user.jpg"
//               alt="user"
//               className="w-8 h-8 rounded-full"
//             />
//             <img
//               src="/default-user.jpg"
//               alt="user"
//               className="w-8 h-8 rounded-full"
//             />
//           </ul>
//         </div>

//         <div className="flex gap-2 mt-4">
//           <button className="flex-1 px-3 py-2 bg-gray-100 rounded-lg">
//             Editar
//           </button>
//           <button className="flex-1 px-3 py-2 bg-red-500 text-white rounded-lg">
//             Excluir
//           </button>
//         </div>
//       </div>
//     </aside>
//  </div>
