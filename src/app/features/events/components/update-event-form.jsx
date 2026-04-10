import { useEffect, useReducer } from "react";
import { getHours, getMinutes } from "date-fns";
import Heading from "../../../shared/ui/heading";
import Input from "../../../shared/ui/input";
import Button from "../../../shared/ui/button";
import SpinnerMini from "../../../shared/ui/SpinnerMini";

import { useEvent } from "../hooks/use-event";
import { useUpdateEvent } from "../hooks/use-update-event";
import { formatHour } from "../../../shared/utils/helpers";

const initialState = {
  title: undefined,
  description: undefined,
  date: undefined,
  startTime: undefined,
  endTime: undefined,
  type: undefined,
  location: undefined,
};
function reducer(state, action) {
  switch (action.type) {
    case "SET_VALUE":
      return { ...state, ...action.payload };
  }
}
function UpdateEventForm({ onCloseModal, eventId }) {
  const { data } = useEvent(eventId);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { update, isPending } = useUpdateEvent();

  const { startTime, endTime, date, title, description, type, location } =
    state || {};
  function handleChange(value, field) {
    if (field === "startTime" || field === "endTime") {
      const [hour, min] = value.split(":");
      const time = new Date(date);
      time.setHours(+hour, +min);
      dispatch({ type: "SET_VALUE", payload: { [field]: time.toISOString() } });
    } else if (
      field === "date" &&
      (endTime || data.startTime || startTime || data.endTime)
    ) {
      const newData = {
        [field]: value,
      };
      const date = new Date(value);
      startTime || data.startTime
        ? (newData.startTime = new Date(
            new Date(startTime || data.startTime).setDate(date.getDate()),
          ))
        : null;
      endTime || data.startTime
        ? (newData.endTime = new Date(
            new Date(endTime || data.endTime).setDate(date.getDate()),
          ))
        : null;
      dispatch({ type: "SET_VALUE", payload: { ...newData } });
    } else {
      dispatch({ type: "SET_VALUE", payload: { [field]: value } });
    }
  }
  function onSubmit(e) {
    e.preventDefault();
    if (state.type === "video-call") state.location = undefined;
    update({ eventId: data.id, ...state }, { onSuccess: onCloseModal });
  }
  const startHour = formatHour(data.startTime);
  const endHour = formatHour(data.endTime);
  return (
    <form onSubmit={onSubmit}>
      <div className="w-full p-[2rem] min-w-[45rem] gap-[1.5rem] flex flex-col ">
        <div>
          <Heading as="h2">Actualizar Evento</Heading>
          <span>Actualize as informações deste Evento</span>
        </div>
        <div className="flex w-full">
          <Input
            defaultValues={data.title}
            label="Título"
            value={title}
            setValue={(e) => handleChange(e, "title")}
          />
        </div>
        <div className="flex w-full">
          <Input
            defaultValues={data.description}
            value={description}
            label="Descrição"
            setValue={(e) => handleChange(e, "description")}
          />
        </div>
        <div className="flex w-full">
          <Input
            defaultValues={data.date}
            type="date"
            value={date}
            setValue={(e) => handleChange(e, "date")}
            label="Data"
          />
        </div>
        {(date || (data.date && !date)) && (
          <div className="flex gap-[2rem] w-full">
            <Input
              defaultValues={startHour}
              type="time"
              label="Hora de Início"
              value={startTime}
              setValue={(e) => handleChange(e, "startTime")}
            />{" "}
            <Input
              type="time"
              defaultValues={endHour}
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
                checked={
                  type === "video-call" || (data.type === "video-call" && !type)
                }
                onChange={() => handleChange("video-call", "type")}
                type="checkbox"
                id="call"
              />
            </div>
            <div className="flex  gap-[1rem]">
              <label htmlFor="presencial">Presencial</label>
              <input
                checked={
                  type === "presential" || (data.type === "presential" && !type)
                }
                onChange={() => handleChange("presential", "type")}
                type="checkbox"
                id="presencial"
              />
            </div>
          </div>
          {(type === "presential" || data.type === "presential") && (
            <div className="flex w-full">
              <Input
                defaultValues={location || data.location}
                label="Localização"
                value={location}
                setValue={(e) => handleChange(e, "location")}
              />
            </div>
          )}
        </div>
        <Button disabled={isPending}>
          {isPending ? <SpinnerMini /> : "Actualizar Evento"}
        </Button>
      </div>
    </form>
  );
}

export default UpdateEventForm;
