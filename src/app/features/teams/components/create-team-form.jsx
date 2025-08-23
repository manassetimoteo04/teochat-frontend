import { useReducer, useState } from "react";
import Button from "../../../shared/ui/button";
import Input from "../../../shared/ui/input";
import { Search, X } from "lucide-react";
import InputSearch from "../../../shared/ui/input-search";
import clsx from "clsx";
import { normalizeText } from "../../../shared/utils/helpers";
const users = [
  {
    id: "9b2fc0c0-5d31-41f5-8ae0-9dc99f4323a1",
    name: "Manasse Timóteo",
  },
  {
    id: "e1b1b63f-770b-49fa-bc70-54197b4f2dc6",
    name: "Pedro Lima",
  },
  {
    id: "fb948b6e-3389-4e80-ae65-038d1bd0e4b7",
    name: "Ana Oliveira",
  },
  {
    id: "c48ad682-f52e-4fd1-9279-80cf780fd127",
    name: "João Pedro Oliveira",
  },
  {
    id: "f153a0e5-4828-4c4f-b1f8-e0ef9d5a6f5f",
    name: "Tiago Nascimento",
  },
  {
    id: "2eb20b45-b4fc-4bcf-bc5f-3400a203d349",
    name: "Isabela Rocha",
  },
];

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
  const [state, dispatch] = useReducer(reducer, initialState);
  const { currentStep, name, description, tags, members } = state;
  const [query, setQuery] = useState("");
  const filteredUsers = users.filter((user) =>
    normalizeText(user.name).startsWith(normalizeText(query))
  );

  function handleChange(value, field) {
    dispatch({ type: "SET_VALUES", payload: { [field]: value } });
  }

  const onSubmit = (e) => {
    e.preventDefault();
  };
  function handleNextStep() {
    dispatch({ type: "NEXT_STEP" });
  }
  function handlePrevStep() {
    dispatch({ type: "PREV_STEP" });
  }
  function handleSetMembers(user) {
    const exists = members.filter((us) => us.id === user.id).at(0);
    if (exists) {
      dispatch({ type: "REMOVE_MEMBERS", payload: user.id });
    } else dispatch({ type: "SET_MEMBERS", payload: user });
  }
  function handleRemoveMember(id) {
    dispatch({ type: "REMOVE_MEMBERS", payload: id });
  }
  return (
    <form
      onSubmit={onSubmit}
      className="p-[4rem_2rem] flex items-center flex-col gap-[2rem] max-w-[45rem]"
    >
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
              <div className="flex items-center gap-[0.5rem] p-[0.5rem] bg-gray-100 rounded-full border">
                <img
                  src="/default-user.jpg"
                  className="w-[2rem] rounded-full"
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
          </div>
        </div>
      )}
      <div className="flex justify-center w-full gap-[1rem]">
        <Button
          variation="secondary"
          onClick={handlePrevStep}
          className="bg-green-500 hover:bg-green-600 w-full p-[0.8rem_1.5rem] rounded-full"
        >
          Voltar
        </Button>{" "}
        <Button
          onClick={handleNextStep}
          className="bg-green-500 hover:bg-green-600 w-full p-[0.8rem_1.5rem] rounded-full"
        >
          Próximo
        </Button>
      </div>
    </form>
  );
}

export default CreateTeamForm;
