import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { logout } from "../services/auth-services";
import { useLocalStorage } from "../../../shared/hooks/use-localstorage";
import { useAppContext } from "../../../shared/providers/context";
import { disconnectSocket } from "../../../shared/services/socket-client";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { dispatch } = useAppContext();
  const { removeToLocalStorage } = useLocalStorage("token");

  const { mutate, isPending } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      disconnectSocket();
      removeToLocalStorage();
      dispatch({ type: "RESET" });
      queryClient.clear();
      toast.success("Sessão terminada com sucesso");
      navigate("/sign-in", { replace: true });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { logout: mutate, isPending };
}
