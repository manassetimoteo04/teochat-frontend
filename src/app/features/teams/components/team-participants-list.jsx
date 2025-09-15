import { Plus, Trash2, User } from "lucide-react";
import ButtonIcon from "../../../shared/ui/button-icon";
import Spinner from "../../../shared/ui/Spinner";
import Modal from "../../../shared/ui/modal";
import InputSearch from "../../../shared/ui/input-search";
import { useTeamParticipants } from "../hooks/use-team-participants";
import RemoveMemberAlert from "./remove-member-alert";
import { useRemoveTeamMember } from "../hooks/use-remove-team-member";
import Heading from "../../../shared/ui/heading";
import Button from "../../../shared/ui/button";
import { useState } from "react";
import { normalizeText } from "../../../shared/utils/helpers";
import EmptyList from "../../../shared/ui/empty-list";

function TeamParticipantsList() {
  const { data, isPending } = useTeamParticipants();
  const { removeMember, isPending: isRemoving } = useRemoveTeamMember();
  const [query, setQuery] = useState("");

  const queriedResults = query
    ? data?.filter((item) =>
        normalizeText(item.name).startsWith(normalizeText(query))
      )
    : data;
  if (isPending) return <Spinner />;
  return (
    <div className="">
      <div className=" p-[2rem] pr-0">
        <header className="flex gap-[1rem] flex-col">
          <Heading>Participantes</Heading>
          <div className="flex justify-start">
            <div>
              <InputSearch value={query} setValue={setQuery} />
            </div>
          </div>
        </header>
        {!isPending && (
          <>
            {queriedResults.length > 0 && (
              <div className=" max-h-[40rem] overflow-y-scroll flex flex-col ">
                {queriedResults.map((user) => (
                  <div
                    key={user.id}
                    className="flex border-b last:border-b-0 p-[1.5rem_0] justify-between"
                  >
                    <div className="flex items-center gap-[1rem]">
                      <img
                        src={user.avatar || "/default-user.jpg"}
                        className="w-[5rem] h-[5rem] rounded-full"
                        alt=""
                      />
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
            {queriedResults.length < 1 && (
              <EmptyList
                title="Nenhum participante foi encontrado"
                opensId="add-team-member"
              />
            )}
          </>
        )}
        {isPending && <Spinner />}
      </div>
    </div>
  );
}

export default TeamParticipantsList;
