import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProjectTask } from "../services/project-services";
import { toast } from "sonner";

const TOAST_ID = "DELETE_ID";
export function useDeleteProjectTask() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (id) => deleteProjectTask(id),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Tarefa excluída com sucesso", { id: TOAST_ID });
    },
    onMutate() {
      toast.loading("Excluíndo Tarefa", { id: TOAST_ID });
    },
    onError(err) {
      toast.error(err.message, { id: TOAST_ID });
    },
  });

  return { deleteTask: mutate, isPending };
}
