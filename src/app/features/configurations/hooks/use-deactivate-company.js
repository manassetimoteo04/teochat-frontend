import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAppContext } from "../../../shared/providers/context";
import { deactivateCompany } from "../services/settings-services";

export function useDeactivateCompany() {
  const queryClient = useQueryClient();
  const { dispatch } = useAppContext();

  const { mutate, isPending } = useMutation({
    mutationFn: deactivateCompany,
    onSuccess: (data) => {
      queryClient.setQueryData(["settings", "company", data.id], data);
      queryClient.setQueryData(["companies", "current", data.id], (previous) =>
        previous ? { ...previous, companyId: data } : previous,
      );
      dispatch({ type: "SET_COMPANY", payload: data });
      toast.success("Empresa desactivada com sucesso");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { deactivate: mutate, isPending };
}
