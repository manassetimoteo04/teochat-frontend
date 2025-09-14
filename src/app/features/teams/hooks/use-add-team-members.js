import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTeamMembers } from "../services/teams-services";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
export function useAddTeamMembers() {
  const queryClient = useQueryClient();
  const { teamId, companyId } = useParams();
  const { mutate, isPending } = useMutation({
    mutationFn: (data) => addTeamMembers({ ...data, teamId, companyId }),
    onSuccess: () => {
      toast.success("Membros adicionados com sucesso");
      queryClient.invalidateQueries({ queryKey: ["teams"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { addMember: mutate, isPending };
}
