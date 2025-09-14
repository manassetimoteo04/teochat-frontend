import { useMutation } from "@tanstack/react-query";
import { verifyAccount } from "../services/auth-services";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export function useVerifyAccount() {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: verifyAccount,
    onSuccess() {
      toast.success("Conta verificada com sucesso");
      navigate("/companies", { replace: true });
    },
    onError(err) {
      toast.error(err.message);
    },
  });
  return { verify: mutate, isPending };
}
