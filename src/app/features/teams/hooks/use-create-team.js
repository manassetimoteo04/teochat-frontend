import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createNewTeam } from "../services/teams-services";
import { useAppContext } from "../../../shared/providers/context/";
export function useCreateTeam() {
  const queryClient = useQueryClient();
  const { currentCompany } = useAppContext();
  const { mutate, isPending } = useMutation({
    mutationFn: (data) =>
      createNewTeam({ ...data, companyId: currentCompany.id }),
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
