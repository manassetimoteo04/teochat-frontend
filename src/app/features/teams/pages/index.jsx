import { Ellipsis, Star, UserPlus } from "lucide-react";
import TeamDetails from "../components/team-details";
import ButtonIcon from "../../../shared/ui/button-icon";

function TeamsPage() {
  return (
    <div>
      <header className="flex  items-center  text-secondary-text-color  justify-between p-[2rem_3rem]">
        <div>
          <span className="text-[1.4rem]">teams | teochat team</span>
        </div>
        <div className="flex gap-[2rem]">
          <ButtonIcon>
            <Star size={20} />
          </ButtonIcon>
          <ButtonIcon>
            <UserPlus size={20} />
          </ButtonIcon>{" "}
          <ButtonIcon>
            <Ellipsis size={20} />
          </ButtonIcon>
        </div>
      </header>
      <TeamDetails />
    </div>
  );
}

export default TeamsPage;
