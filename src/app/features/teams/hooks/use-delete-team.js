import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { deleteTeam } from "../services/teams-services";

export function useDeleteTeam() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { teamId, companyId } = useParams();
  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteTeam({ teamId, companyId }),
    onSuccess: () => {
      navigate(`/${companyId}/dashboard`, { replace: true });
      toast.success("Equipe eliminada com sucesso");
      queryClient.invalidateQueries({ queryKey: ["teams"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { deleteTeam: mutate, isPending };
}
