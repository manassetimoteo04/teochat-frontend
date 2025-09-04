import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { updateTeam } from "../services/teams-services";
import { toast } from "sonner";

export function useUpdateTeam() {
  const queryClient = useQueryClient();
  const { teamId, companyId } = useParams();
  const { mutate, isPending } = useMutation({
    mutationFn: (data) => updateTeam({ ...data, teamId, companyId }),
    onSuccess: () => {
      toast.success("Informações actualizadas com sucesso");
      queryClient.invalidateQueries({ queryKey: ["teams"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { update: mutate, isPending };
}
