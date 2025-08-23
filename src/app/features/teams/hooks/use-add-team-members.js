import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTeamMembers } from "../services/teams-services";
import { toast } from "sonner";
export function useAddTeamMembers() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: addTeamMembers,
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
