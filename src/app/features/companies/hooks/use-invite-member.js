import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { inviteCompanyMember } from "../services/companies-services";
import { useAppContext } from "../../../shared/providers/context";
export function useInviteMember() {
  const { currentCompany } = useAppContext();
  const { mutate, isPending } = useMutation({
    mutationFn: (data) =>
      inviteCompanyMember({ ...data, companyId: currentCompany.id }),
    onSuccess() {
      toast.success("Convite enviado por email com sucesso");
    },
    onError(err) {
      toast.error(err.message);
    },
  });
  return { sendInvite: mutate, isPending };
}
