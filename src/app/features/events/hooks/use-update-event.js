import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import { updateEvent } from "../services/event-services";
export function useUpdateEvent() {
  const queryClient = useQueryClient();
  const { teamId } = useParams();
  const { mutate, isPending } = useMutation({
    mutationFn: (data) => updateEvent({ teamId, ...data }),
    onSuccess() {
      toast.success("Evento actualizado com sucesso");
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
    onError(err) {
      toast.error(err.message);
    },
  });
  return { update: mutate, isPending };
}
