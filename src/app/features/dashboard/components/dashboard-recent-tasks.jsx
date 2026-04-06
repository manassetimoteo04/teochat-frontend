import { useMemo } from "react";
import CardBox from "../ui/card-box";
import Spinner from "../../../shared/ui/Spinner";
import { formatDate } from "../../../shared/utils/helpers";
import { useAppContext } from "../../../shared/providers/context";
import { useCompanyTeams } from "../../teams/hooks/use-company-teams";
import { useCompanyRecentTasks } from "../../projects/hooks/use-company-recent-tasks";

function DashboardRecentTasks() {
  const { currentRole, currentUser } = useAppContext();
  const { data: teams } = useCompanyTeams();

  const memberTeamIds = useMemo(() => {
    if (!Array.isArray(teams)) return [];
    return teams
      .filter((team) =>
        team.members?.some((member) => member.id === currentUser?.id),
      )
      .map((team) => team.id);
  }, [teams, currentUser?.id]);

  const isMember = currentRole === "member";
  const { data: tasks, isPending } = useCompanyRecentTasks({
    teamIds: isMember ? memberTeamIds : [],
    enabled: !isMember || memberTeamIds.length > 0,
  });

  const recentTasks = useMemo(() => {
    const list = Array.isArray(tasks) ? tasks : [];
    const filtered =
      currentRole === "member"
        ? list.filter((task) => task.assignedTo?.id === currentUser?.id)
        : list;

    return filtered
      .sort((a, b) => {
        const dateA = new Date(a.updatedAt || a.createdAt || a.dueDate || 0);
        const dateB = new Date(b.updatedAt || b.createdAt || b.dueDate || 0);
        return dateB - dateA;
      })
      .slice(0, 5);
  }, [tasks, currentRole, currentUser?.id]);

  return (
    <CardBox title="Tarefas recentes">
      <div className="min-h-[22rem] px-[2rem] pb-[2rem]">
        {isPending && <Spinner />}
        {!isPending && recentTasks.length < 1 && (
          <div className="text-secondary-text-color text-[1.3rem]">
            Nenhuma tarefa recente encontrada.
          </div>
        )}
        {!isPending &&
          recentTasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between border-b border-gray-100 py-[1.2rem] last:border-b-0"
            >
              <div>
                <p className="text-main-text-color font-medium">{task.title}</p>
                <p className="text-[1.2rem] text-secondary-text-color">
                  {task.project?.title || "Projeto"}
                </p>
              </div>
              <div className="text-[1.2rem] text-secondary-text-color">
                {task.dueDate
                  ? formatDate(new Date(task.dueDate), true, true)
                  : "Sem data"}
              </div>
            </div>
          ))}
      </div>
    </CardBox>
  );
}

export default DashboardRecentTasks;
