import { useQuery } from "@tanstack/react-query";
import { useAppContext } from "../../../shared/providers/context";
import { getCompanyTeams } from "../../teams/services/teams-services";
import {
  getTasksByProjectId,
  getTeamProjects,
} from "../services/project-services";

export function useCompanyRecentTasks({ teamIds = [], enabled = true } = {}) {
  const { currentCompany } = useAppContext();
  const companyId = currentCompany?.id;

  const { data, isPending } = useQuery({
    queryKey: ["company", "tasks", companyId, teamIds],
    enabled: Boolean(companyId) && enabled,
    queryFn: async () => {
      let resolvedTeamIds = teamIds;
      if (!resolvedTeamIds?.length) {
        const teams = await getCompanyTeams({ companyId });
        resolvedTeamIds = teams?.map((team) => team.id) || [];
      }
      if (!resolvedTeamIds.length) return [];

      const projectsByTeam = await Promise.all(
        resolvedTeamIds.map(async (teamId) => {
          const projects = await getTeamProjects(teamId);
          return (projects || []).map((project) => ({
            ...project,
            teamId: project.teamId || teamId,
          }));
        }),
      );

      const projects = projectsByTeam.flat();
      if (!projects.length) return [];

      const tasksByProject = await Promise.all(
        projects.map(async (project) => {
          const tasks = await getTasksByProjectId(project.id);
          return (tasks || []).map((task) => ({
            ...task,
            project,
          }));
        }),
      );

      return tasksByProject.flat();
    },
  });

  return { data, isPending };
}
