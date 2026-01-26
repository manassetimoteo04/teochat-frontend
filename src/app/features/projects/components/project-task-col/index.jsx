import { Plus } from "lucide-react";
import TaskCard from "../task-card";

export default function ProjectTaskCol({ data, type, color }) {
  return (
    <div>
      <header
        style={{ backgroundColor: color }}
        className="grid     sticky top-0 left-0 min-w-[30rem] grid-cols-[3rem_1fr] p-[1rem] gap-[1rem] items-center  rounded-full "
      >
        <span className="w-[3rem] h-[3rem]  flex items-center justify-center bg-white rounded-full">
          {data.length}
        </span>
        <div className="flex w-full justify-between items-center">
          <span>{type}</span>
          <button>
            <Plus />
          </button>
        </div>
      </header>
      <div className="mt-[2rem] h-[calc(100dvh-10rem)] overflow-y-scroll     flex flex-col gap-[1rem]">
        {data.map((task) => (
          <TaskCard task={task} key={task.id} />
        ))}
        {data.length < 1 && (
          <span className="text-center items-center flex justify-center mt-[4rem] text-secondary-text-color">
            Nenhuma Tarefa{" "}
          </span>
        )}
      </div>
    </div>
  );
}
