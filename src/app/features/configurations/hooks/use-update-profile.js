import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateMyProfile } from "../services/settings-services";
import { useAppContext } from "../../../shared/providers/context";

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const { dispatch } = useAppContext();

  const { mutate, isPending } = useMutation({
    mutationFn: updateMyProfile,
    onSuccess: (data) => {
      queryClient.setQueryData(["settings", "profile"], data);
      queryClient.setQueryData(["session"], data);
      dispatch({ type: "SET_USER", payload: data });
      toast.success("Perfil actualizado com sucesso");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { updateProfile: mutate, isPending };
}
