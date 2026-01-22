import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { createProjectTask } from "../services/project-services";
import { toast } from "sonner";

export function useCreateProjectTask() {
  const { projectId } = useParams();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (data) => createProjectTask(projectId, { ...data }),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["task"] });
      toast.success("Nova tarefa criado com successo");
    },
    onError(err) {
      toast.error(err.message);
    },
  });

  return { create: mutate, isPending };
}
