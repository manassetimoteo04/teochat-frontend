import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteProject } from "../services/project-services";

export function useDeleteProject() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (projectId) => deleteProject(projectId),
    onSuccess: () => {
      toast.success("Projecto eliminado com sucesso");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { remove: mutate, isPending };
}
