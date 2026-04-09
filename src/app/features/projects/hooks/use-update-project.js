import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateProject } from "../services/project-services";

export function useUpdateProject() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: ({ projectId, ...data }) => updateProject(projectId, data),
    onSuccess: () => {
      toast.success("Projecto actualizado com sucesso");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { update: mutate, isPending };
}
