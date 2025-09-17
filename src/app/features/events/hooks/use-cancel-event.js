import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelEvent } from "../services/event-services";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
export function useCancelEvent() {
  const queryClient = useQueryClient();
  const { companyId } = useParams();
  const { mutate, isPending } = useMutation({
    mutationFn: (data) => cancelEvent({ ...data, companyId }),
    onSuccess() {
      toast.success("Evento cancelado com sucesso");
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
    onError(err) {
      toast.error(err.message);
    },
  });
  return { cancelEvent: mutate, isCanceling: isPending };
}
