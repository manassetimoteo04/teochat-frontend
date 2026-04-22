import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { createInstantCall as createInstantCallRequest } from "../services/meeting-services";
import { getStreamCallToken } from "../services/stream-call-service";

export function useCreateInstantCall() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { companyId, teamId } = useParams();

  const { mutate, isPending } = useMutation({
    mutationFn: async (payload = {}) => {
      const instantCall = await createInstantCallRequest({
        teamId,
        companyId,
        ...payload,
      });

      const initialStreamToken = await getStreamCallToken({
        companyId,
        teamId,
        callId: instantCall.meetingCall.callId,
      });

      return {
        ...instantCall,
        initialStreamToken,
      };
    },
    onSuccess: (instantCall) => {
      queryClient.invalidateQueries({
        queryKey: ["meetings", "calls", teamId],
      });
      toast.success("Chamada instantânea iniciada com sucesso");

      const roomPath = `/${companyId}/teams/${teamId}/calls/${instantCall.meetingCall.callId}?eventId=${instantCall.event.id}`;

      navigate(roomPath, {
        state: {
          eventId: instantCall.event.id,
          callStatus: instantCall.meetingCall.status,
          initialStreamToken: instantCall.initialStreamToken,
          instantCallData: {
            event: instantCall.event,
            meetingCall: instantCall.meetingCall,
          },
        },
      });
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  return {
    createInstantCall: mutate,
    isPending,
  };
}
