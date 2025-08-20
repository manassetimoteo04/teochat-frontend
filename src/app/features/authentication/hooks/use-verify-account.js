import { useMutation } from "@tanstack/react-query";
import { verifyAccount } from "../services/auth-services";
import { toast } from "sonner";

export function useVerifyAccount() {
  const { mutate, isPending } = useMutation({
    mutationFn: verifyAccount,
    onSuccess(data) {
      toast.success("Conta verificada com sucesso");
    },
    onError(err) {
      toast.error(err.message);
    },
  });
  return { verify: mutate, isPending };
}
