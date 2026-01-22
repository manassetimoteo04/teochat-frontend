import { Plus } from "lucide-react";
import TaskCard from "../task-card";

export default function ProjectTaskCol({ total, data, type, color }) {
  return (
    <div>
      <header
        style={{ backgroundColor: color }}
        className="grid  grid-cols-[3rem_1fr] p-[1rem] gap-[1rem] items-center  rounded-full "
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
      <div className="mt-[2rem] flex flex-col gap-[1rem]">
        {data.map((task) => (
          <TaskCard task={task} key={task.id} />
        ))}
      </div>
    </div>
  );
}
