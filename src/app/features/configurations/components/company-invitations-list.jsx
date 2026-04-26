import { Mail, ShieldCheck } from "lucide-react";
import Spinner from "../../../shared/ui/Spinner";
import SettingsPanel from "./settings-panel";
import Tag from "../../../shared/ui/tag";
import { formatDate } from "../../../shared/utils/helpers";

function InvitationState({ invitation }) {
  if (invitation.accepted) return <Tag type="active">Aceite</Tag>;
  if (invitation.canceled) return <Tag type="inactive">Cancelado</Tag>;
  return <Tag type="pending">Pendente</Tag>;
}

function CompanyInvitationsList({ invitations, isPending }) {
  return (
    <SettingsPanel
      title="Convites"
      description="Convites pendentes, aceites ou cancelados para acesso à empresa."
    >
      {isPending ? (
        <div className="h-[20rem]">
          <Spinner />
        </div>
      ) : invitations?.length ? (
        <div className="flex flex-col gap-[1rem]">
          {invitations.map((invitation) => (
            <div
              key={invitation.id}
              className="grid gap-[1rem] rounded-2xl border border-gray-100 bg-gray-50 px-[1.6rem] py-[1.4rem] md:grid-cols-[1fr_auto]"
            >
              <div className="flex items-start gap-[1.2rem]">
                <span className="mt-[0.2rem] flex h-[4rem] w-[4rem] items-center justify-center rounded-full bg-white text-secondary-text-color">
                  <Mail size={18} />
                </span>
                <div>
                  <p className="text-[1.5rem] font-medium text-main-text-color">
                    {invitation.destination}
                  </p>
                  <div className="mt-[0.4rem] flex flex-wrap gap-x-[1.2rem] gap-y-[0.4rem] text-[1.3rem] text-secondary-text-color">
                    <span>
                      Criado em {formatDate(new Date(invitation.createdAt), true, true)}
                    </span>
                    <span>
                      Expira em {formatDate(new Date(invitation.expiresIn), true, true)}
                    </span>
                    <span className="flex items-center gap-[0.4rem]">
                      <ShieldCheck size={14} />
                      {invitation.createdBy}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-start justify-start md:justify-end">
                <InvitationState invitation={invitation} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-[1.4rem] text-secondary-text-color">
          Nenhum convite encontrado para esta empresa.
        </p>
      )}
    </SettingsPanel>
  );
}

export default CompanyInvitationsList;
