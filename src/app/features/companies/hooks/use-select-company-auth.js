import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../../shared/hooks/use-localstorage";
import { selectCompanyAuth } from "../services/companies-services";
export function useSelectCompanyAuth() {
  const navigate = useNavigate();
  const { setToLocalStorage } = useLocalStorage();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: selectCompanyAuth,
    onSuccess({ data }) {
      setToLocalStorage(data.token, "token");
      setToLocalStorage(data.company, "companyId");
      toast.success("Empresa selecionada com sucesso");
      navigate("/app");
      queryClient.invalidateQueries({ queryKey: ["session", "companies"] });
    },
    onError(err) {
      toast.error(err.message);
    },
  });
  return { select: mutate, isPending };
}
