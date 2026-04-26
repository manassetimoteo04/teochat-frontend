import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { removeCompanyMember } from "../services/settings-services";

export function useRemoveCompanyMember() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: removeCompanyMember,
    onSuccess: (data, variables) => {
      queryClient.setQueryData(["members", variables.companyId], (previous) =>
        Array.isArray(previous)
          ? previous.filter((member) => member.id !== data.memberId)
          : previous,
      );

      toast.success(
        data.deactivated
          ? "Membro removido e conta desactivada"
          : "Membro removido com sucesso",
      );
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { removeMember: mutate, isPending };
}
