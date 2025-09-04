import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { addTeamLider } from "../services/teams-services";
import { toast } from "sonner";

export function useAddTeamLider() {
  const queryClient = useQueryClient();
  const { teamId, companyId } = useParams();
  const { mutate, isPending } = useMutation({
    mutationFn: (data) => addTeamLider({ ...data, teamId, companyId }),
    onSuccess: () => {
      toast.success("Membro promovido com sucesso");
      queryClient.invalidateQueries({ queryKey: ["teams"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { setLider: mutate, isPending };
}
