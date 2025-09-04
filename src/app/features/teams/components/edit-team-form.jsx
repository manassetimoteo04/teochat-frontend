import { useReducer } from "react";
import Button from "../../../shared/ui/button";
import Input from "../../../shared/ui/input";
import Spinner from "../../../shared/ui/Spinner";
import SpinnerMini from "../../../shared/ui/SpinnerMini";
import { useGetTeamDetails } from "../hooks/use-get-team-details";
import { useUpdateTeam } from "../hooks/use-update-team";
const initialState = {
  name: undefined,
  description: undefined,
  tags: undefined,
};
function reducer(state, action) {
  switch (action.type) {
    case "SET_VALUES":
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
function EditTeamForm({ onCloseModal }) {
  const { data, isPending } = useGetTeamDetails();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { name, description, tags } = state;
  const { update, isPending: isUpdating } = useUpdateTeam();
  function handleChange(value, field) {
    dispatch({ type: "SET_VALUES", payload: { [field]: value } });
  }

  if (isPending) return <Spinner />;

  function onUpdate(e) {
    e.preventDefault();
    update({ updateData: state }, { onSuccess: onCloseModal });
  }
  return (
    <form className="p-[2rem] flex flex-col gap-[2rem]">
      <header className="mt-[2rem">
        <h2 className="text-[2.4rem] font-[600]">Editar Team</h2>
        <span className="text-secondary-text-color ">
          Edite as informações do básicas desta equipe
        </span>
      </header>
      <div className="w-full gap-[1.5rem] flex flex-col ">
        <div className="flex w-full">
          <Input
            label="Nome"
            value={name}
            defaultValues={data.name}
            setValue={(val) => handleChange(val, "name")}
          />
        </div>
        <div className="flex w-full">
          <Input
            label="Descrição"
            value={description}
            defaultValues={data.description}
            setValue={(val) => handleChange(val, "description")}
          />
        </div>
        <div className="flex w-full">
          <Input
            value={tags}
            label="Tags: ex:#marketing, #programming"
            defaultValues={data.tags}
            setValue={(val) => handleChange(val, "tags")}
          />
        </div>
        <div className="flex flex-col gap-[1rem] w-full">
          <label htmlFor="">Foto</label>
          <input
            type="file"
            label=""
            className="file:rounded-xl  max-w-[30rem] file:border-0 file:bg-main-color file:px-[1rem] file:py-[0.8rem] file:text-white file:font-medium file:cursor-pointer file:hover:bg-primary-dark transition"
          />
        </div>
      </div>
      <Button onClick={onUpdate} disabled={isUpdating}>
        {isUpdating ? <SpinnerMini /> : "Salvar Alterações"}
      </Button>
    </form>
  );
}

export default EditTeamForm;
