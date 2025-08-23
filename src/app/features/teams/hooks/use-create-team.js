import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createNewTeam } from "../services/teams-services";
export function useCreateTeam() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: createNewTeam,
    onSuccess() {
      toast.success("Novo team criado com sucesso");
      queryClient.invalidateQueries({ queryKey: ["teams"] });
    },
    onError(err) {
      toast.error(err.message);
    },
  });
  return { create: mutate, isPending };
}
