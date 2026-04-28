import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAppContext } from "../../../shared/providers/context";
import { updateCompanySettings } from "../services/settings-services";

export function useUpdateCompanySettings() {
  const queryClient = useQueryClient();
  const { dispatch } = useAppContext();

  const { mutate, isPending } = useMutation({
    mutationFn: updateCompanySettings,
    onSuccess: (data, variables) => {
      queryClient.setQueryData(
        ["settings", "company", variables.companyId],
        data,
      );
      queryClient.setQueryData(
        ["companies", "current", variables.companyId],
        (previous) => (previous ? { ...previous, companyId: data } : previous),
      );
      dispatch({ type: "SET_COMPANY", payload: data });
      toast.success("Dados da empresa actualizados com sucesso");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { updateCompany: mutate, isPending };
}
