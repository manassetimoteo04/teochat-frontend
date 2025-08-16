import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { signUp } from "../services/auth-services";

export function useSignUp() {
  const { mutate, isPending } = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      toast.success(
        "Conta Criada com sucesso verifique o email para confirmar"
      );
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { signUp: mutate, isPending };
}
