import { Crown, Shield, Trash2, UserRoundPlus } from "lucide-react";
import Button from "../../../shared/ui/button";
import Modal from "../../../shared/ui/modal";
import Spinner from "../../../shared/ui/Spinner";
import SpinnerMini from "../../../shared/ui/SpinnerMini";
import Tag from "../../../shared/ui/tag";
import { formatDate, rewriteRoles } from "../../../shared/utils/helpers";
import SettingsConfirmAction from "./settings-confirm-action";
import SettingsPanel from "./settings-panel";

function roleBadge(role) {
  const styles = {
    member: "bg-gray-100 text-gray-600 border border-gray-200",
    admin: "bg-blue-100 text-blue-700 border border-blue-100",
    super_admin: "bg-amber-100 text-amber-700 border border-amber-100",
  };

  return styles[role] || styles.member;
}

function RoleIcon({ role }) {
  if (role === "super_admin") return <Crown size={14} />;
  if (role === "admin") return <Shield size={14} />;
  return null;
}

function CompanyMembersList({
  members,
  isPending,
  canManage,
  canPromote,
  isInactive,
  promoteMember,
  isPromoting,
  removeMember,
  isRemoving,
}) {
  return (
    <SettingsPanel
      title="Membros"
      description="Controla funções e permissões dos membros da empresa."
    >
      {isPending ? (
        <div className="h-[24rem]">
          <Spinner />
        </div>
      ) : members?.length ? (
        <Modal>
          <div className="overflow-hidden rounded-2xl border border-gray-100">
            <div className="hidden grid-cols-[1.7fr_0.9fr_1fr_auto] gap-[1rem] border-b border-gray-100 bg-gray-50 px-[1.6rem] py-[1.1rem] text-[1.2rem] font-medium uppercase tracking-[0.08rem] text-secondary-text-color lg:grid">
              <span>Membro</span>
              <span>Papel</span>
              <span>Entrada</span>
              <span className="text-right">Acções</span>
            </div>
            <div className="flex flex-col">
              {members.map((member) => {
                const memberRole = member.companies?.role;
                const isAlreadyPrivileged =
                  memberRole === "admin" || memberRole === "super_admin";
                const canRemoveMember =
                  canManage && memberRole !== "super_admin";
                const canPromoteMember =
                  canPromote && !isAlreadyPrivileged && !isInactive;

                return (
                  <div
                    key={member.id}
                    className="grid gap-[1rem] border-b border-gray-100 px-[1.6rem] py-[1.4rem] last:border-b-0 lg:grid-cols-[1.7fr_0.9fr_1fr_auto] lg:items-center"
                  >
                    <div className="flex items-center gap-[1.2rem]">
                      <img
                        src={member.avatar || "/default-user.jpg"}
                        alt={member.name}
                        className="h-[4.8rem] w-[4.8rem] rounded-full border border-gray-100 object-cover"
                      />
                      <div>
                        <p className="text-[1.5rem] font-medium text-main-text-color">
                          {member.name}
                        </p>
                        <p className="text-[1.3rem] text-secondary-text-color">
                          {member.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center gap-[0.6rem]">
                      <Tag className={roleBadge(memberRole)}>
                        <span className="flex items-center gap-[0.4rem]">
                          <RoleIcon role={memberRole} />
                          {rewriteRoles(memberRole) || memberRole}
                        </span>
                      </Tag>
                    </div>
                    <span className="text-[1.3rem] text-secondary-text-color">
                      {formatDate(new Date(member.companies?.joined), true, true)}
                    </span>
                    <div className="flex flex-wrap items-center justify-start gap-[0.8rem] lg:justify-end">
                      {canPromoteMember && (
                        <Button
                          onClick={() => promoteMember({ memberId: member.id })}
                          disabled={isPromoting || isInactive}
                          variation="secondary"
                          size="sm"
                          className="w-auto"
                        >
                          {isPromoting ? (
                            <SpinnerMini />
                          ) : (
                            <UserRoundPlus size={16} />
                          )}
                          <span>Promover</span>
                        </Button>
                      )}
                      {canRemoveMember && (
                        <Modal.Open id={`remove-member-${member.id}`}>
                          <Button
                            variation="danger"
                            size="sm"
                            disabled={isInactive}
                            className="w-auto"
                          >
                            <Trash2 size={16} />
                            <span>Remover</span>
                          </Button>
                        </Modal.Open>
                      )}
                      <Modal.Window id={`remove-member-${member.id}`}>
                        <SettingsConfirmAction
                          title="Remover membro"
                          description={`Tens a certeza que desejas remover ${member.name} desta empresa?`}
                          actionLabel="Confirmar remoção"
                          isPending={isRemoving}
                          onConfirm={(closeModal) =>
                            removeMember(
                              { memberId: member.id },
                              { onSuccess: closeModal },
                            )
                          }
                        />
                      </Modal.Window>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Modal>
      ) : (
        <p className="text-[1.4rem] text-secondary-text-color">
          Nenhum membro encontrado.
        </p>
      )}
    </SettingsPanel>
  );
}

export default CompanyMembersList;
