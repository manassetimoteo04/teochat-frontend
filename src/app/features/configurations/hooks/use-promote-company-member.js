import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { promoteCompanyMember } from "../services/settings-services";

export function usePromoteCompanyMember() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: promoteCompanyMember,
    onSuccess: (data, variables) => {
      queryClient.setQueryData(["members", variables.companyId], (previous) =>
        Array.isArray(previous)
          ? previous.map((member) =>
              member.id === data.id
                ? {
                    ...member,
                    ...data,
                    companies: {
                      ...(member.companies || {}),
                      ...(Array.isArray(data.companies)
                        ? data.companies[0] || {}
                        : {}),
                    },
                  }
                : member,
            )
          : previous,
      );
      toast.success("Membro promovido para administrador");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { promoteMember: mutate, isPending };
}
