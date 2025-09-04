import { useMutation } from "@tanstack/react-query";
import { createCompany } from "../services/companies-services";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
export function useCreateCompany() {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: createCompany,
    onSuccess({ data: { data } }) {
      toast.success("Empresa Criada com sucesso");
      navigate("/" + data.id);
    },
    onError(err) {
      toast.error(err.message);
    },
  });
  return { create: mutate, isPending };
}
