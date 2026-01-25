import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { archiveChannel } from "../../services";
import { toast } from "sonner";

const TOAST_ID = "TOAST_ID";
export function useArchiveChatChannel() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { companyId, teamId } = useParams();
  const { mutate, isPending } = useMutation({
    mutationFn: async (id) => archiveChannel(id),
    onSuccess: () => {
      toast.success("Canal arquivado com sucesso", { id: TOAST_ID });
      queryClient.invalidateQueries({ queryKey: ["channels"] });
      navigate(`${companyId}/chats/${teamId}`);
    },
    onMutate() {
      toast.loading("Arquivando este canal", { id: TOAST_ID });
    },
    onError(err) {
      toast.error(err.message, { id: TOAST_ID });
    },
  });

  return { mutate, isPending };
}
