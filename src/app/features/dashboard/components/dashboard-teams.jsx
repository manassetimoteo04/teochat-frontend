import { ChevronRight } from "lucide-react";
import CardBox from "../ui/card-box";
import Spinner from "../../../shared/ui/Spinner";
import EmptyList from "../../../shared/ui/empty-list";
import { useCompanyTeams } from "../../teams/hooks/use-company-teams";
import { useNavigate, useParams } from "react-router-dom";
import { generateAvatar } from "../../../shared/utils/helpers";
import { useAppContext } from "../../../shared/providers/context";

function DashboardTeams() {
  const navigate = useNavigate();
  const { companyId } = useParams();
  const { currentRole } = useAppContext();
  const { data, isPending } = useCompanyTeams();
  const teams = Array.isArray(data) ? data : [];
  const visibleTeams = teams;

  return (
    <CardBox
      title={currentRole === "member" ? "Minhas equipas" : "Equipes da Empresa"}
    >
      <div className="min-h-[30rem]">
        {isPending && <Spinner />}
        {!isPending && visibleTeams.length < 1 && (
          <div>
            {currentRole === "member" ? (
              <div className="flex flex-col items-center justify-center mt-[5rem] text-secondary-text-color">
                <span className="text-center">
                  Você ainda não pertence a nenhuma equipa.
                </span>
              </div>
            ) : (
              <EmptyList
                title="Nenhuma equipa foi encontrada"
                opensId="create-new-team"
              />
            )}
          </div>
        )}
        {!isPending &&
          visibleTeams.length > 0 &&
          visibleTeams.map((team) => (
            <div
              key={team.id}
              className="grid p-[0.5rem_2rem]  items-center grid-cols-[5rem_1fr] gap-[1rem]"
            >
              {/* <img
                src={"default-user.jpg"}
                alt=""
                className="w-[5rem] rounded-full h-[5rem]"
              /> */}

              <div
                style={{ backgroundColor: generateAvatar().color }}
                className="w-[5rem] h-[5rem] border rounded-full flex items-center justify-center"
              >
                {generateAvatar(team.name).initials}
              </div>

              <div className="flex  p-[0.5rem_0] justify-between items-center">
                <div>
                  <p className="text-main-text-color">{team.name}</p>
                  <span className="text-secondary-text-color">
                    {team.members?.length || 0} membros
                  </span>
                </div>
                <button
                  onClick={() => navigate(`/${companyId}/teams/${team.id}`)}
                  className="text-secondary-text-color"
                >
                  <ChevronRight />
                </button>
              </div>
            </div>
          ))}
      </div>
    </CardBox>
  );
}

export default DashboardTeams;
