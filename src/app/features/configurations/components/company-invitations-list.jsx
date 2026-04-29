import { Mail, ShieldCheck, ChevronLeft, ChevronRight } from "lucide-react";

import { useMemo, useState } from "react";

import Spinner from "../../../shared/ui/Spinner";
import SettingsPanel from "./settings-panel";
import Tag from "../../../shared/ui/tag";

import { formatDate } from "../../../shared/utils/helpers";

const PER_PAGE = 6;

function InvitationState({ invitation }) {
  if (invitation.accepted) {
    return <Tag type="active">Aceite</Tag>;
  }

  if (invitation.canceled) {
    return <Tag type="inactive">Cancelado</Tag>;
  }

  return <Tag type="pending">Pendente</Tag>;
}

function CompanyInvitationsList({ invitations, isPending }) {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil((invitations?.length || 0) / PER_PAGE);

  const paginated = useMemo(() => {
    const start = (page - 1) * PER_PAGE;

    return invitations?.slice(start, start + PER_PAGE);
  }, [invitations, page]);

  function previousPage() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  function nextPage() {
    if (page < totalPages) {
      setPage(page + 1);
    }
  }

  return (
    <SettingsPanel
      title="Convites"
      description="
 Convites pendentes,
 aceites ou cancelados.
"
    >
      {isPending ? (
        <div className="h-[20rem]">
          <Spinner />
        </div>
      ) : invitations?.length ? (
        <div className="flex flex-col gap-4">
          {paginated.map((invitation) => (
            <div
              key={invitation.id}
              className="
rounded-2xl
border border-gray-100
bg-gray-50
p-5
transition
hover:border-gray-200
"
            >
              <div
                className="
flex flex-col
gap-4
md:flex-row
md:items-start
md:justify-between
"
              >
                <div
                  className="
flex items-start gap-4 min-w-0
"
                >
                  <div
                    className="
w-16 h-16
rounded-2xl
bg-white
flex items-center justify-center
shadow-sm
shrink-0
"
                  >
                    <Mail size={22} />
                  </div>

                  <div className="min-w-0">
                    <p
                      className="
text-[1.5rem]
font-medium
truncate
"
                    >
                      {invitation.destination}
                    </p>

                    <div
                      className="
mt-3
grid
gap-2
sm:grid-cols-2
lg:grid-cols-3
text-[1.3rem]
text-secondary-text-color
"
                    >
                      <span>
                        Criado em{" "}
                        {formatDate(new Date(invitation.createdAt), true, true)}
                      </span>

                      <span>
                        Expira em{" "}
                        {formatDate(new Date(invitation.expiresIn), true, true)}
                      </span>

                      <span
                        className="
flex items-center gap-2
"
                      >
                        <ShieldCheck size={14} />
                        {invitation.createdBy}
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  className="
md:pl-4
flex items-start
"
                >
                  <InvitationState invitation={invitation} />
                </div>
              </div>
            </div>
          ))}

          {/* pagination */}
          {totalPages > 1 && (
            <div
              className="
flex flex-wrap
items-center
justify-between
gap-4
pt-2
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
                <button
                  onClick={previousPage}
                  disabled={page === 1}
                  className="
flex items-center gap-2
rounded-xl border
px-4 py-2
text-[1.3rem]
disabled:opacity-50
hover:bg-gray-50
"
                >
                  <ChevronLeft size={15} />
                  Anterior
                </button>

                <button
                  onClick={nextPage}
                  disabled={page === totalPages}
                  className="
flex items-center gap-2
rounded-xl border
px-4 py-2
text-[1.3rem]
disabled:opacity-50
hover:bg-gray-50
"
                >
                  Seguinte
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <p
          className="
text-[1.4rem]
text-secondary-text-color
"
        >
          Nenhum convite encontrado para esta empresa.
        </p>
      )}
    </SettingsPanel>
  );
}

export default CompanyInvitationsList;
