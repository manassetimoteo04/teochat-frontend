import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { createProject } from "../services/project-services";
export function useCreateProject() {
  const { teamId } = useParams();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (data) => createProject({ teamId, ...data }),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Novo projecto criado com successo");
    },
    onError(err) {
      toast.error(err.message);
    },
  });
  return { create: mutate, isPending };
}
