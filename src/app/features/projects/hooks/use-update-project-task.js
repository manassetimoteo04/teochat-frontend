import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProjectTask } from "../services/project-services";
import { toast } from "sonner";

const TOAST_ID = "DELETE_ID";
export function useUpdateProjectTask() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: ({ id, ...rest }) => updateProjectTask(id, rest),
    onSuccess() {
      queryClient.invalidateQueries();
      toast.success("Tarefa actualizada com sucesso", { id: TOAST_ID });
    },
    onMutate() {
      toast.loading("Actualizando Tarefa", { id: TOAST_ID });
    },
    onError(err) {
      toast.error(err.message, { id: TOAST_ID });
    },
  });

  return { update: mutate, isPending };
}
