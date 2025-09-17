import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { createNewEvent } from "../services/event-services";

export function useCreateEvent() {
  const { teamId, companyId } = useParams();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => createNewEvent({ companyId, teamId, ...data }),
    onSuccess: () => {
      toast.success("Novo evento agendado com sucesso");
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { createEvent: mutate, isPending };
}
