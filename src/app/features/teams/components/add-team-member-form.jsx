import { useReducer, useState } from "react";
import { useCompanyMembers } from "../../companies/hooks/use-company-members";
import { normalizeText } from "../../../shared/utils/helpers";
import clsx from "clsx";
import Spinner from "../../../shared/ui/Spinner";
import SpinnerMini from "../../../shared/ui/SpinnerMini";
import { Search, X } from "lucide-react";
import InputSearch from "../../../shared/ui/input-search";
import { useGetTeamDetails } from "../hooks/use-get-team-details";
import Button from "../../../shared/ui/button";
import { useParams } from "react-router-dom";
import { useAddTeamMembers } from "../hooks/use-add-team-members";
import { toast } from "sonner";
import Heading from "../../../shared/ui/heading";

const initialState = {
  members: [],
};
function reducer(state, action) {
  switch (action.type) {
    case "SET_MEMBERS":
      return { ...state, members: [...state.members, action.payload] };
    case "REMOVE_MEMBERS":
      return {
        ...state,
        members: [
          ...state.members.filter((user) => user.id !== action.payload),
        ],
      };
  }
}

function AddTeamMemberForm({ onCloseModal }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { addMember, isPending: isAdding } = useAddTeamMembers();
  const { data: users, isPending } = useCompanyMembers();
  const {
    data: { members: currents },
  } = useGetTeamDetails();

  const { members } = state;
  const [query, setQuery] = useState("");
  const filteredUsersExisted = users
    ? users?.filter((user) => !currents?.some((cur) => cur === user.id))
    : [];
  const filteredUsers = filteredUsersExisted
    ? filteredUsersExisted?.filter((user) =>
        normalizeText(user.name).startsWith(normalizeText(query))
      )
    : [];

  function handleSetMembers(user) {
    const exists = members.filter((us) => us.id === user.id).at(0);

    if (exists) {
      dispatch({ type: "REMOVE_MEMBERS", payload: user.id });
    } else dispatch({ type: "SET_MEMBERS", payload: user });
  }
  function handleRemoveMember(id) {
    dispatch({ type: "REMOVE_MEMBERS", payload: id });
  }
  function onSubmit(e) {
    e.preventDefault();
    if (!members.length) return toast.error("Selecione pelomenos um membro");
    const ids = members.map((mem) => mem.id);
    addMember({ members: ids }, { onSuccess: onCloseModal });
  }
  return (
    <form className="p-[2rem] flex items-center flex-col gap-[2rem] max-w-[45rem]">
      <div className=" flex flex-col ">
        <Heading as="h2">Adicionar Membros</Heading>
        <span className="text-secondary-text-color ">
          Selecione os membros que desejas adicionar ao team
        </span>
      </div>
      <div className="w-full gap-[1.5rem] flex flex-col ">
        <div className="flex flex-wrap gap-3">
          {members.map((user) => (
            <div
              key={user.id}
              className="flex items-center gap-[0.5rem] p-[0.5rem] bg-gray-100 rounded-full border"
            >
              <img
                src={user.avatar || "/default-user.jpg"}
                className="w-[2rem] h-[2rem] rounded-full"
                alt=""
              />
              <p className="text-[1.3rem]">{user.name}</p>
              <span
                onClick={() => handleRemoveMember(user.id)}
                className="text-secondary-text-color hover:text-main-text-color cursor-pointer"
              >
                <X size={18} />
              </span>
            </div>
          ))}
        </div>
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
                    onClick={() => handleSetMembers(user)}
                    key={user.id}
                    className={clsx(
                      "flex hover:bg-gray-100 rounded-lg items-center gap-[0.5rem] p-[1rem]  ",
                      members.some((mem) => mem.id === user.id) && "bg-gray-100"
                    )}
                  >
                    <img
                      src={user.avatar || "/default-user.jpg"}
                      className="w-[3rem] h-[3rem] rounded-full"
                      alt=""
                    />
                    <p className="">{user.name}</p>
                  </div>
                ))
              ) : (
                <span className="text-center text-secondary-text-color flex-col flex justify-center items-center p-[2rem]">
                  <Search />
                  Nenhum Resultado encontrado para {query}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
      <Button disabled={isAdding} onClick={onSubmit}>
        {isAdding ? <SpinnerMini /> : "Adicionar"}
      </Button>
    </form>
  );
}

export default AddTeamMemberForm;
