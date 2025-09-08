import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelEvent } from "../services/event-services";
import { toast } from "sonner";
export function useCancelEvent() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: cancelEvent,
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
