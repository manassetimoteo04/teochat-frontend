import {
  Crown,
  Shield,
  Trash2,
  UserRoundPlus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { useMemo, useState } from "react";

import Button from "../../../shared/ui/button";
import Modal from "../../../shared/ui/modal";
import Spinner from "../../../shared/ui/Spinner";
import SpinnerMini from "../../../shared/ui/SpinnerMini";
import Tag from "../../../shared/ui/tag";

import { formatDate, rewriteRoles } from "../../../shared/utils/helpers";

import SettingsConfirmAction from "./settings-confirm-action";
import SettingsPanel from "./settings-panel";

const PER_PAGE = 8;

function roleBadge(role) {
  return {
    member: "bg-gray-100 text-gray-600 border border-gray-200",

    admin: "bg-blue-100 text-blue-700 border border-blue-100",

    super_admin: "bg-amber-100 text-amber-700 border border-amber-100",
  }[role];
}

function RoleIcon({ role }) {
  if (role === "super_admin") return <Crown size={14} />;

  if (role === "admin") return <Shield size={14} />;

  return null;
}

function MemberActions({
  member,
  canPromoteMember,
  canRemoveMember,
  promoteMember,
  removeMember,
  isPromoting,
  isRemoving,
  isInactive,
}) {
  return (
    <>
      {canPromoteMember && (
        <Button
          variation="secondary"
          size="sm"
          className="w-auto"
          disabled={isPromoting || isInactive}
          onClick={() =>
            promoteMember({
              memberId: member.id,
            })
          }
        >
          {isPromoting ? <SpinnerMini /> : <UserRoundPlus size={15} />}
          <span>Promover</span>
        </Button>
      )}

      {canRemoveMember && (
        <>
          <Modal.Open id={`remove-member-${member.id}`}>
            <Button
              variation="danger"
              size="sm"
              className="w-auto"
              disabled={isInactive}
            >
              <Trash2 size={15} />
              <span>Remover</span>
            </Button>
          </Modal.Open>

          <Modal.Window id={`remove-member-${member.id}`}>
            <SettingsConfirmAction
              title="Remover membro"
              description={`
Tens a certeza que desejas remover
${member.name}
desta empresa?
`}
              actionLabel="Confirmar remoção"
              isPending={isRemoving}
              onConfirm={(closeModal) =>
                removeMember(
                  {
                    memberId: member.id,
                  },
                  {
                    onSuccess: closeModal,
                  },
                )
              }
            />
          </Modal.Window>
        </>
      )}
    </>
  );
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
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(members?.length / PER_PAGE);

  const paginated = useMemo(() => {
    const start = (page - 1) * PER_PAGE;

    return members?.slice(start, start + PER_PAGE);
  }, [members, page]);

  return (
    <SettingsPanel
      title="Membros"
      description="
Controla funções e permissões dos membros.
"
    >
      {isPending ? (
        <div className="h-[24rem]">
          <Spinner />
        </div>
      ) : members?.length ? (
        <Modal>
          <div
            className="
rounded-2xl
border border-gray-100
overflow-hidden
"
          >
            <div
              className="
hidden lg:grid
grid-cols-[1.7fr_.9fr_1fr_auto]
gap-4
px-6 py-4
bg-gray-50
border-b
text-[1.2rem]
uppercase
tracking-[.08rem]
text-secondary-text-color
"
            >
              <span>Membro</span>
              <span>Papel</span>
              <span>Entrada</span>
              <span className="text-right">Acções</span>
            </div>

            <div className="flex flex-col">
              {paginated.map((member) => {
                const role = member.companies?.role;

                const privileged = role === "admin" || role === "super_admin";

                const canRemoveMember = canManage && role !== "super_admin";

                const canPromoteMember =
                  canPromote && !privileged && !isInactive;

                return (
                  <div
                    key={member.id}
                    className="
border-b last:border-0
p-5
lg:grid
lg:grid-cols-[1.7fr_.9fr_1fr_auto]
lg:items-center
gap-4
"
                  >
                    <div
                      className="
flex items-center gap-4
"
                    >
                      <img
                        src={member.avatar || "/default-user.jpg"}
                        alt={member.name}
                        className="
w-14 h-14
rounded-full
object-cover
border
"
                      />

                      <div className="min-w-0">
                        <p
                          className="
font-medium
text-[1.45rem]
truncate
"
                        >
                          {member.name}
                        </p>

                        <p
                          className="
text-[1.25rem]
truncate
text-secondary-text-color
"
                        >
                          {member.email}
                        </p>
                      </div>
                    </div>

                    <div
                      className="
mt-4 lg:mt-0
"
                    >
                      <Tag className={roleBadge(role)}>
                        <span
                          className="
flex items-center gap-1
"
                        >
                          <RoleIcon role={role} />
                          {rewriteRoles(role)}
                        </span>
                      </Tag>
                    </div>

                    <div
                      className="
mt-3 lg:mt-0
text-[1.3rem]
text-secondary-text-color
"
                    >
                      {formatDate(
                        new Date(member.companies?.joined),
                        true,
                        true,
                      )}
                    </div>

                    <div
                      className="
mt-4 lg:mt-0
flex flex-wrap gap-2
lg:justify-end
"
                    >
                      <MemberActions
                        member={member}
                        canPromoteMember={canPromoteMember}
                        canRemoveMember={canRemoveMember}
                        promoteMember={promoteMember}
                        removeMember={removeMember}
                        isPromoting={isPromoting}
                        isRemoving={isRemoving}
                        isInactive={isInactive}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {totalPages > 1 && (
            <div
              className="
mt-5
flex items-center
justify-between
gap-4
flex-wrap
"
            >
              <p
                className="
text-[1.3rem]
text-secondary-text-color
"
              >
                Página {page} de {totalPages}
              </p>

              <div className="flex gap-2">
                <Button
                  variation="secondary"
                  size="sm"
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  <ChevronLeft size={15} />
                  Anterior
                </Button>

                <Button
                  variation="secondary"
                  size="sm"
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Seguinte
                  <ChevronRight size={15} />
                </Button>
              </div>
            </div>
          )}
        </Modal>
      ) : (
        <p
          className="
text-[1.4rem]
text-secondary-text-color
"
        >
          Nenhum membro encontrado.
        </p>
      )}
    </SettingsPanel>
  );
}

export default CompanyMembersList;
