import clsx from "clsx";
import { Search, X } from "lucide-react";
import { useReducer, useState } from "react";

import Button from "../../../shared/ui/button";
import Input from "../../../shared/ui/input";
import Spinner from "../../../shared/ui/Spinner";
import SpinnerMini from "../../../shared/ui/SpinnerMini";
import InputSearch from "../../../shared/ui/input-search";
import { normalizeText } from "../../../shared/utils/helpers";
import { useCompanyMembers } from "../../companies/hooks/use-company-members";
import { useCreateTeam } from "../hooks/use-create-team";

const initialState = {
  currentStep: 1,
  name: "",
  description: "",
  tags: "",
  members: [],
};
function reducer(state, action) {
  switch (action.type) {
    case "NEXT_STEP":
      return { ...state, currentStep: state.currentStep + 1 };
    case "PREV_STEP":
      return { ...state, currentStep: Math.max(state.currentStep - 1, 1) };
    case "SET_VALUES":
      return { ...state, ...action.payload };
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
function CreateTeamForm() {
  const { create, isPending: isCreating } = useCreateTeam();
  const { data: users, isPending } = useCompanyMembers();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { currentStep, name, description, tags, members } = state;
  const [query, setQuery] = useState("");
  const filteredUsers = users
    ? users?.members.filter((user) =>
        normalizeText(user.name).startsWith(normalizeText(query))
      )
    : [];

  function handleChange(value, field) {
    dispatch({ type: "SET_VALUES", payload: { [field]: value } });
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const newTeam = {
      name,
      description,
      tags,
      members: members?.map((mem) => mem._id),
    };
    create({ newTeam });
  };
  function handleNextStep() {
    dispatch({ type: "NEXT_STEP" });
  }
  function handlePrevStep() {
    dispatch({ type: "PREV_STEP" });
  }
  function handleSetMembers(user) {
    const exists = members.filter((us) => us.id === user._id).at(0);
    if (exists) {
      dispatch({ type: "REMOVE_MEMBERS", payload: user._id });
    } else dispatch({ type: "SET_MEMBERS", payload: user });
  }
  function handleRemoveMember(id) {
    dispatch({ type: "REMOVE_MEMBERS", payload: id });
  }
  return (
    <form className="p-[4rem_2rem] flex items-center flex-col gap-[2rem] max-w-[45rem]">
      <div className=" flex flex-col ">
        {currentStep === 1 && (
          <>
            <h2 className="text-[2.4rem] font-[600]">Criar novo Team</h2>
            <span className="text-secondary-text-color ">
              Por favor preencha o formulário para criar o novo team
            </span>
          </>
        )}{" "}
        {currentStep === 2 && (
          <>
            <h2 className="text-[2.4rem] font-[600]">Selecionar Membros</h2>
            <span className="text-secondary-text-color ">
              Selecione os membros que vão participar no teu Team
            </span>
          </>
        )}
      </div>
      {currentStep === 1 && (
        <div className="w-full gap-[1.5rem] flex flex-col ">
          <div className="flex w-full">
            <Input
              value={name}
              defaultValues={name}
              setValue={(val) => handleChange(val, "name")}
              label="Nome"
            />
          </div>
          <div className="flex w-full">
            <Input
              defaultValues={description}
              value={description}
              setValue={(val) => handleChange(val, "description")}
              label="Descrição"
            />
          </div>
          <div className="flex w-full">
            <Input
              defaultValues={tags}
              value={tags}
              setValue={(val) => handleChange(val, "tags")}
              label="Tags: ex:#marketing, #programming"
            />
          </div>
        </div>
      )}{" "}
      {currentStep === 2 && (
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
                        members.some((mem) => mem.id === user.id) &&
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
      )}
      <div className="flex justify-center w-full gap-[1rem]">
        {currentStep > 1 && (
          <Button
            variation="secondary"
            onClick={handlePrevStep}
            className="bg-green-500 hover:bg-green-600 w-full p-[0.8rem_1.5rem] rounded-full"
          >
            Voltar
          </Button>
        )}
        {currentStep === 1 && (
          <Button
            onClick={handleNextStep}
            className="bg-green-500 hover:bg-green-600 w-full p-[0.8rem_1.5rem] rounded-full"
          >
            Próximo
          </Button>
        )}
        {currentStep > 1 && (
          <Button
            onClick={onSubmit}
            className="bg-green-500 hover:bg-green-600 w-full p-[0.8rem_1.5rem] rounded-full"
          >
            {isCreating && <SpinnerMini />} Criar Novo Team
          </Button>
        )}
      </div>
    </form>
  );
}

export default CreateTeamForm;
