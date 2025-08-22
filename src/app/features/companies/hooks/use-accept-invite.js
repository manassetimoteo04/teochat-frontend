import { useMutation, useQueryClient } from "@tanstack/react-query";
import { acceptInvite } from "../services/companies-services";
import { toast } from "sonner";
import { useLocalStorage } from "../../../shared/hooks/use-localstorage";
import { useNavigate } from "react-router-dom";

export function useAcceptInvite() {
  const { setToLocalStorage } = useLocalStorage();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: acceptInvite,
    onSuccess: ({ data }) => {
      toast.success("O convite foi aceite com successo, redirecionando");
      console.log(data);
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

  return { accept: mutate, isPending };
}
