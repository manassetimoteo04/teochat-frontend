import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createChatChannel } from "../../services";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

export function useCreateChatChannel() {
  const queryClient = useQueryClient();
  const { teamId } = useParams();
  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => createChatChannel({ ...data, teamId }),
    onSuccess: () => {
      toast.success("Canal criado com sucesso");
      queryClient.invalidateQueries({ queryKey: ["channels"] });
    },
    onError(err) {
      toast.error(err.message);
    },
  });

  return { mutate, isPending };
}
