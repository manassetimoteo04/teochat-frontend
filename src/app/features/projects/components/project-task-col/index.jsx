import { Plus } from "lucide-react";
import TaskCard from "../task-card";

export default function ProjectTaskCol({ data, type, color }) {
  return (
    <div className="min-w-[26rem] flex-1">
      <header
        style={{ backgroundColor: color }}
        className="sticky top-[1rem] left-0 grid grid-cols-[3.2rem_1fr] gap-[0.8rem] items-center rounded-2xl border border-white/60 px-[1rem] py-[0.8rem] shadow-sm backdrop-blur"
      >
        <span className="w-[3.2rem] h-[3.2rem] flex items-center justify-center bg-white/90 text-[1.3rem] font-semibold rounded-xl shadow">
          {data.length}
        </span>
        <div className="flex w-full justify-between items-center">
          <div>
            <p className="text-[1.4rem] font-semibold text-main-text-color">
              {type}
            </p>
            <p className="text-[1.1rem] text-secondary-text-color">
              {data.length} tarefas
            </p>
          </div>
          <button className="w-[3rem] h-[3rem] rounded-xl bg-white/90 border border-white/70 flex items-center justify-center hover:bg-white">
            <Plus size={18} />
          </button>
        </div>
      </header>
      <div className="mt-[1rem] h-[calc(100dvh-12rem)] overflow-y-auto flex flex-col gap-[1rem] pr-[0.5rem]">
        {data.map((task) => (
          <TaskCard task={task} key={task.id} />
        ))}
        {data.length < 1 && (
          <div className="text-center items-center flex justify-center mt-[4rem] text-secondary-text-color border border-dashed border-gray-200 rounded-2xl p-[1.5rem] bg-white">
            Nenhuma tarefa nesta coluna
          </div>
        )}
      </div>
    </div>
  );
}
