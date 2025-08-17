import { useMutation } from "@tanstack/react-query";
import { signIn } from "../services/auth-services";
import { toast } from "sonner";
import { useLocalStorage } from "../../../shared/hooks/use-localstorage";

function useSignIn() {
  const { setToLocalStorage } = useLocalStorage("token");
  const { mutate, isPending } = useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      toast.success("Sessão inciada com successo");
      setToLocalStorage(data.token);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { signIn: mutate, isPending };
}

export default useSignIn;
