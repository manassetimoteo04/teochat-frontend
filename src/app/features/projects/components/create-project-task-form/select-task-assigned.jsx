import clsx from "clsx";
import { useOutsideClick } from "../../../../shared/hooks/use-outsideclick";
import { useTeamParticipants } from "../../../teams/hooks/use-team-participants";
import { useState } from "react";
import InputSearch from "../../../../shared/ui/input-search";
import { normalizeText } from "../../../../shared/utils/helpers";
import { Search } from "lucide-react";

export default function SelectTaskAssigned({ setShowList, handleSetAssigned }) {
  const { data, isPending } = useTeamParticipants();
  const [query, setQuery] = useState("");
  const ref = useOutsideClick(() => setShowList(false));
  const filteredUsers = data?.filter((user) =>
    normalizeText(user.name).startsWith(normalizeText(query)),
  );
  return (
    <div
      ref={ref}
      className="absolute border border-main-border-color p-[1rem] rounded-lg bg-white shadow-sm bottom-[0rem] right-0 w-[25rem] overflow-scroll max-h-[30rem]"
    >
      <h5>Membros da Equipa</h5>

      <div className="flex w-full">
        <InputSearch value={query} setValue={setQuery} />
      </div>
      <div>
        {isPending && <Spinner />}
        {!isPending && (
          <div className="flex gap-[0.3rem] max-h-[35rem] overflow-y-scroll flex-col">
            {filteredUsers.length ? (
              filteredUsers.map((user) => (
                <div
                  onClick={() => handleSetAssigned(user)}
                  key={user.id}
                  className={clsx(
                    "flex cursor-pointer hover:bg-gray-50 rounded-2xl items-center gap-[0.5rem] p-[1rem]  ",
                  )}
                >
                  <img
                    src={user.avatar || "/default-user.jpg"}
                    className="w-[3rem] h-[3rem] border rounded-full"
                    alt=""
                  />
                  <div>
                    <p className="text-[1.6rem]">{user.name}</p>
                  </div>
                </div>
              ))
            ) : (
              <span className="text-center text-secondary-text-color flex-col flex justify-center items-center p-[2rem]">
                <Search />
                Nenhum Resultado encontrado {query && "para " + query}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
