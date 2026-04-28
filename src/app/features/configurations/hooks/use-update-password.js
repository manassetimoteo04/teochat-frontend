import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateMyPassword } from "../services/settings-services";

export function useUpdatePassword() {
  const { mutate, isPending } = useMutation({
    mutationFn: updateMyPassword,
    onSuccess: () => {
      toast.success("Palavra-passe alterada com sucesso");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { updatePassword: mutate, isPending };
}
