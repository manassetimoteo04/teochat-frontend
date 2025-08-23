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
          ...state.members.filter((user) => user._id !== action.payload),
        ],
      };
  }
}

function AddTeamMemberForm({ onCloseModal }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { teamId } = useParams();
  const { addMember, isPending: isAdding } = useAddTeamMembers();
  const { data: users, isPending } = useCompanyMembers();
  const {
    data: { members: currents },
  } = useGetTeamDetails();

  const { members } = state;
  const [query, setQuery] = useState("");
  const filteredUsersExisted = users
    ? users?.members?.filter(
        (user) => !currents?.some((cur) => cur === user._id)
      )
    : [];
  const filteredUsers = filteredUsersExisted
    ? filteredUsersExisted?.filter((user) =>
        normalizeText(user.name).startsWith(normalizeText(query))
      )
    : [];

  function handleSetMembers(user) {
    const exists = members.filter((us) => us._id === user._id).at(0);

    if (exists) {
      dispatch({ type: "REMOVE_MEMBERS", payload: user._id });
    } else dispatch({ type: "SET_MEMBERS", payload: user });
  }
  function handleRemoveMember(id) {
    dispatch({ type: "REMOVE_MEMBERS", payload: id });
  }
  function onSubmit(e) {
    e.preventDefault();
    if (!members.length) return toast.error("Selecione pelomenos um membro");
    addMember({ members, teamId }, { onSuccess: onCloseModal });
  }
  return (
    <form className="p-[3rem_2rem] flex items-center flex-col gap-[2rem] max-w-[45rem]">
      <div className=" flex flex-col ">
        <h2 className="text-[2.4rem] font-[600]">Adicionar Membros</h2>
        <span className="text-secondary-text-color ">
          Selecione os membros que desejas adicionar ao team
        </span>
      </div>
      <div className="w-full gap-[1.5rem] flex flex-col ">
        <div className="flex flex-wrap gap-3">
          {members.map((user) => (
            <div
              key={user._id}
              className="flex items-center gap-[0.5rem] p-[0.5rem] bg-gray-100 rounded-full border"
            >
              <img
                src="/default-user.jpg"
                className="w-[2rem] rounded-full"
                alt=""
              />
              <p className="text-[1.3rem]">{user.name}</p>
              <span
                onClick={() => handleRemoveMember(user._id)}
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
                    key={user._id}
                    className={clsx(
                      "flex hover:bg-gray-100 rounded-lg items-center gap-[0.5rem] p-[1rem]  ",
                      members.some((mem) => mem._id === user._id) &&
                        "bg-gray-100"
                    )}
                  >
                    <img
                      src="/default-user.jpg"
                      className="w-[2.4rem] rounded-full"
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
