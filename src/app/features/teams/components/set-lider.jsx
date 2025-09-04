import clsx from "clsx";
import { useState } from "react";
import { Search } from "lucide-react";

import InputSearch from "../../../shared/ui/input-search";
import Spinner from "../../../shared/ui/Spinner";
import SpinnerMini from "../../../shared/ui/SpinnerMini";
import Button from "../../../shared/ui/button";
import { normalizeText } from "../../../shared/utils/helpers";
import { useTeamParticipants } from "../hooks/use-team-participants";
import { useAddTeamLider } from "../hooks/user-add-team-lider";

function SetLider({ onCloseModal }) {
  const [selected, setSelected] = useState(null);
  const { data: users, isPending } = useTeamParticipants();
  const { setLider, isPending: isAdding } = useAddTeamLider();
  const [query, setQuery] = useState("");

  const filteredUsers = users?.filter((user) =>
    normalizeText(user.name).startsWith(normalizeText(query))
  );
  return (
    <div className="p-[2rem] flex flex-col gap-[2rem] max-w-[50rem]">
      <header className="mt-[2rem]">
        <h3 className="text-[1.8rem]">Adicionar Líder</h3>
        <span className="text-secondary-text-color">
          Clique no membro de desejas provover a líder
        </span>
      </header>
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
                  onClick={() =>
                    setSelected((s) => (s === user.id ? null : user.id))
                  }
                  key={user.id}
                  className={clsx(
                    "flex cursor-pointer hover:bg-gray-50 rounded-2xl items-center gap-[0.5rem] p-[1rem]  ",
                    selected === user.id && "bg-gray-100 hover:bg-gray-100"
                  )}
                >
                  <img
                    src={user.avatar || "/default-user.jpg"}
                    className="w-[5rem] h-[5rem] border rounded-full"
                    alt=""
                  />
                  <div>
                    <p className="">{user.name}</p>
                    <p className="text-secondary-text-color">{user.email}</p>
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
      {selected && (
        <Button
          onClick={() =>
            setLider({ memberId: selected }, { onSuccess: onCloseModal })
          }
        >
          {isAdding ? <SpinnerMini /> : "Adicionar Líder"}
        </Button>
      )}
    </div>
  );
}

export default SetLider;
