import { useParams } from "react-router-dom";
import { removeTeamLider } from "../services/teams-services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useRemoveTeamLider() {
  const { teamId, companyId } = useParams();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: () => removeTeamLider({ teamId, companyId }),
    onSuccess: () => {
      toast.success("Líder removido com sucesso");
      queryClient.invalidateQueries({ queryKey: ["teams"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { removeLider: mutate, isPending };
}
