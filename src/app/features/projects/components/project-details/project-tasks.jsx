import Spinner from "../../../../shared/ui/Spinner";
import { useGetTasksByProjectId } from "../../hooks/use-get-tasks-by-project-id";
import ProjectTaskCol from "../project-task-col";

export default function ProjectTasks() {
  const { data, isPending } = useGetTasksByProjectId();
  if (isPending) return <Spinner />;
  return (
    <div className="grid grid-cols-3 gap-[2rem] p-[2rem] ">
      <ProjectTaskCol
        data={data.filter((el) => el.status === "todo")}
        type="Pendentes"
        total={23}
        color="#dbeafe"
      />
      <ProjectTaskCol
        data={data.filter((el) => el.status === "in_progress")}
        type="Em Progresso"
        total={23}
        color="#fef9c3"
      />
      <ProjectTaskCol
        data={data.filter((el) => el.status === "done")}
        type="Concluídos"
        total={23}
        color="#fee2e2"
      />
    </div>
  );
}
