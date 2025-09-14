import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { removeTeamMembers } from "../services/teams-services";
import { toast } from "sonner";

export function useRemoveTeamMember() {
  const queryClient = useQueryClient();
  const { teamId, companyId } = useParams();
  const { mutate, isPending } = useMutation({
    mutationFn: (data) => removeTeamMembers({ ...data, teamId, companyId }),
    onSuccess: () => {
      toast.success("Membro removido com sucesso");
      queryClient.invalidateQueries({ queryKey: ["teams"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { removeMember: mutate, isPending };
}
