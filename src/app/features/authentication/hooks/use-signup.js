import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { signUp } from "../services/auth-services";
import { useLocalStorage } from "../../../shared/hooks/use-localstorage";

export function useSignUp() {
  const { setToLocalStorage } = useLocalStorage("token");
  const { mutate, isPending } = useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      toast.success(
        "Conta Criada com sucesso verifique o email para confirmar"
      );
      setToLocalStorage(data.token);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { signUp: mutate, isPending };
}
