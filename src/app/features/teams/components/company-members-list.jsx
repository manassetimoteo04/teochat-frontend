import { Crown, Trash2, User } from "lucide-react";
import ButtonIcon from "../../../shared/ui/button-icon";
import Spinner from "../../../shared/ui/Spinner";
import Modal from "../../../shared/ui/modal";
import InputSearch from "../../../shared/ui/input-search";
import { useTeamParticipants } from "../hooks/use-team-participants";
import RemoveMemberAlert from "./remove-member-alert";
import { useRemoveTeamMember } from "../hooks/use-remove-team-member";

function CompanyListMembers() {
  const { data, isPending } = useTeamParticipants();
  const { removeMember, isPending: isRemoving } = useRemoveTeamMember();
  return (
    <div className="p-[0_3rem] mb-[3rem]">
      <div className="bg-white p-[2rem] border border-gray-100 rounded-2xl">
        <header className="flex gap-[1rem] flex-col">
          <h4 className="text-[2rem]">Participantes</h4>
          <div className="flex justify-start">
            <div>
              <InputSearch />
            </div>
          </div>
        </header>
        {!isPending && (
          <div className=" mt-[2rem] flex flex-col ">
            {data.map((user) => (
              <div
                key={user.id}
                className="flex border-b last:border-b-0 p-[1.5rem_0] justify-between"
              >
                <div className="flex items-center gap-[1rem]">
                  <img src="/default-user.jpg" className="w-[5rem]" alt="" />
                  <div>
                    <div>
                      <p>{user.name}</p>
                    </div>
                    <span className="text-secondary-text-color">
                      {user.email}
                    </span>
                  </div>
                </div>
                <div className="flex gap-[2rem]">
                  <ButtonIcon title="Mais opções">
                    <User size={20} />
                  </ButtonIcon>
                  <Modal.Open id={user.id}>
                    <ButtonIcon title="Remover do Team">
                      <Trash2 size={20} />
                    </ButtonIcon>
                  </Modal.Open>
                </div>
                <Modal.Window id={user.id}>
                  <RemoveMemberAlert
                    onConfirm={removeMember}
                    data={{ memberId: user.id }}
                    isPending={isRemoving}
                  />
                </Modal.Window>
              </div>
            ))}
          </div>
        )}
        {isPending && <Spinner />}
      </div>
    </div>
  );
}

export default CompanyListMembers;
