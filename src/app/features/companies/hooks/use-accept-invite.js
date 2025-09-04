import { useMutation, useQueryClient } from "@tanstack/react-query";
import { acceptInvite } from "../services/companies-services";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export function useAcceptInvite() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: acceptInvite,
    onSuccess: ({ data }) => {
      toast.success("O convite foi aceite com successo, redirecionando");

      navigate("/" + data.id);
      queryClient.invalidateQueries({ queryKey: ["session", "companies"] });
    },
    onError(err) {
      toast.error(err.message);
    },
  });

  return { accept: mutate, isPending };
}
