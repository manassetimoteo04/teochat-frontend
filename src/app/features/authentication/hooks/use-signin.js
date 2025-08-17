import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { signIn } from "../services/auth-services";
import { useLocalStorage } from "../../../shared/hooks/use-localstorage";

function useSignIn() {
  const navigate = useNavigate();
  const { setToLocalStorage } = useLocalStorage("token");
  const { mutate, isPending } = useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      toast.success("Sessão inciada com successo");
      setToLocalStorage(data.token);
      console.log(data);
      if (!data.data.user.isConfirmed) {
        toast.error(
          "Conta não verifica, por favor verifique a tua conta para continuar"
        );
        navigate("/verify-account");
      }
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { signIn: mutate, isPending };
}

export default useSignIn;
