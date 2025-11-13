import { ChevronRight } from "lucide-react";
import CardBox from "../ui/card-box";
import Spinner from "../../../shared/ui/Spinner";
import EmptyList from "../../../shared/ui/empty-list";
import { useCompanyTeams } from "../../teams/hooks/use-company-teams";
import { useNavigate, useParams } from "react-router-dom";
import { generateAvatar } from "../../../shared/utils/helpers";

function DashboardTeams() {
  const navigate = useNavigate();
  const { companyId } = useParams();
  const { data, isPending } = useCompanyTeams();

  return (
    <CardBox title="Equipes da Empresa">
      <div className="min-h-[30rem]">
        {isPending && <Spinner />}
        {!isPending && data?.length < 1 && (
          <EmptyList
            title="Nenhuma equipa foi encontrada"
            opensId="create-new-team"
          />
        )}
        {!isPending &&
          data?.length > 0 &&
          data?.map((team) => (
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
                    {team.members.length} membros
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
