import { useEffect, useReducer } from "react";
import { isBefore } from "date-fns";
import Heading from "../../../shared/ui/heading";
import Input from "../../../shared/ui/input";
import Button from "../../../shared/ui/button";
import { useCreateEvent } from "../hooks/use-create-event";
import SpinnerMini from "../../../shared/ui/SpinnerMini";
import { toast } from "sonner";
import { useGetTeamDetails } from "../../teams/hooks/use-get-team-details";

const initialState = {
  title: "",
  description: "",
  date: "",
  startTime: "",
  endTime: "",
  type: "",
  location: "",
};
function reducer(state, action) {
  switch (action.type) {
    case "SET_VALUE":
      return { ...state, ...action.payload };
  }
}
function CreateEventForm({ onCloseModal }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { createEvent, isPeding } = useCreateEvent();
  const { startTime, endTime, date, title, description, type, location } =
    state || {};
  function handleChange(value, field) {
    if (field === "startTime" || field === "endTime") {
      const [hour, min] = value.split(":");
      const time = new Date(date);
      time.setHours(+hour, +min);
      dispatch({ type: "SET_VALUE", payload: { [field]: time.toISOString() } });
    } else if (field === "date" && (endTime || startTime)) {
      const data = {
        [field]: value,
      };
      const date = new Date(value);
      startTime
        ? (data.startTime = new Date(
            new Date(startTime).setDate(date.getDate()),
          ))
        : null;
      endTime
        ? (data.endTime = new Date(new Date(endTime).setDate(date.getDate())))
        : null;
      dispatch({ type: "SET_VALUE", payload: { ...data } });
    } else {
      dispatch({ type: "SET_VALUE", payload: { [field]: value } });
    }
  }
  function onSubmit(e) {
    e.preventDefault();
    createEvent(state, { onSuccess: onCloseModal });
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="w-full p-[2rem] md:min-w-[35rem] gap-[1.5rem] flex flex-col ">
        <div>
          <Heading as="h2">Criar Evento</Heading>
          <span>Criar evento novo para este team</span>
        </div>
        <div className="flex w-full">
          <Input
            label="Título"
            value={title}
            setValue={(e) => handleChange(e, "title")}
          />
        </div>
        <div className="flex w-full">
          <Input
            value={description}
            label="Descrição"
            setValue={(e) => handleChange(e, "description")}
          />
        </div>
        <div className="flex w-full">
          <Input
            type="date"
            value={date}
            setValue={(e) => handleChange(e, "date")}
            label="Data"
          />
        </div>
        {date && (
          <div className="flex gap-[2rem] w-full">
            <Input
              type="time"
              label="Hora de Início"
              value={startTime}
              setValue={(e) => handleChange(e, "startTime")}
            />{" "}
            <Input
              type="time"
              label="Hora de Término"
              value={endTime}
              setValue={(e) => handleChange(e, "endTime")}
            />
          </div>
        )}

        <div className="flex flex-col gap-[1rem] w-full">
          <label htmlFor="">Tipo de Evento</label>
          <div className="flex text-secondary-text-color gap-[2rem]">
            <div className="flex gap-[1rem]">
              <label htmlFor="call">Video Chamada</label>
              <input
                checked={type === "video-call"}
                onChange={() => handleChange("video-call", "type")}
                type="checkbox"
                id="call"
              />
            </div>
            <div className="flex  gap-[1rem]">
              <label htmlFor="presencial">Presencial</label>
              <input
                checked={type === "presential"}
                onChange={() => handleChange("presential", "type")}
                type="checkbox"
                id="presencial"
              />
            </div>
          </div>
          {type === "presential" && (
            <div className="flex w-full">
              <Input
                defaultValues={location}
                label="Localização"
                value={location}
                setValue={(e) => handleChange(e, "location")}
              />
            </div>
          )}
        </div>
        <Button disabled={isPeding}>
          {isPeding ? <SpinnerMini /> : "Criar Evento"}
        </Button>
      </div>
    </form>
  );
}

export default CreateEventForm;
