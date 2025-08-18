import { useMutation } from "@tanstack/react-query";
import { createCompany } from "../services/companies-services";
import { toast } from "sonner";
import { useLocalStorage } from "../../../shared/hooks/use-localstorage";
import { useNavigate } from "react-router-dom";
export function useCreateCompany() {
  const { setToLocalStorage } = useLocalStorage();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: createCompany,
    onSuccess({ data: { data } }) {
      toast.success("Empresa Criada com sucesso");
      console.log(data);
      setToLocalStorage(data.token, "token");
      setToLocalStorage(data.company[0]._id, "companyId");
      navigate("/app");
    },
    onError(err) {
      toast.error(err.message);
    },
  });
  return { create: mutate, isPending };
}
