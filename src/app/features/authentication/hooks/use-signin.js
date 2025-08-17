import { useMutation } from "@tanstack/react-query";
import { signIn } from "../services/auth-services";
import { toast } from "sonner";

function useSignIn() {
  const { mutate, isPending } = useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      toast.success("Sessão inciada com successo");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { signIn: mutate, isPending };
}

export default useSignIn;
