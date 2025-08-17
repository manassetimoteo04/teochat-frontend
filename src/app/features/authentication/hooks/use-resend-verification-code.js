import { useMutation } from "@tanstack/react-query";
import { resendVerificationCode } from "../services/auth-services";
import { toast } from "sonner";
export function useResendVerificationCode() {
  const { mutate, isPending } = useMutation({
    mutationFn: resendVerificationCode,
    onSuccess: () => {
      toast.success(
        "Novo código de confirmação foi enviado, por favor verifique o teu email"
      );
    },
    onError: () => {
      toast.error(
        "UPS! ocorreu um erro ao reenviar o código de confirmação, por favor tente novamente mais tarde"
      );
    },
  });
  return { resendCode: mutate, isPending };
}
