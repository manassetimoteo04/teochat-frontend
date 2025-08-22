import { useMutation } from "@tanstack/react-query";
import { inviteCompanyMember } from "../services/companies-services";
import { toast } from "sonner";
export function useInviteMember() {
  const { mutate, isPending } = useMutation({
    mutationFn: inviteCompanyMember,
    onSuccess() {
      toast.success("Convite enviado por email com sucesso");
    },
    onError(err) {
      toast.error(err.message);
    },
  });
  return { sendInvite: mutate, isPending };
}
