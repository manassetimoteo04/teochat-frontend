import { useReducer } from "react";
import Heading from "../../../shared/ui/heading";
import Input from "../../../shared/ui/input";
import Button from "../../../shared/ui/button";
import { useCreateEvent } from "../hooks/use-create-event";
import SpinnerMini from "../../../shared/ui/SpinnerMini";

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
    default:
      return state;
  }
}

function buildDateTime(dateStr, timeStr) {
  if (!dateStr || !timeStr) return null;
  const [h, m] = timeStr.split(":");
  const dt = new Date(dateStr);
  dt.setHours(+h, +m, 0, 0);
  return dt.toISOString();
}

function CreateEventForm({ onCloseModal }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { createEvent, isPending } = useCreateEvent();
  const { startTime, endTime, date, title, description, type, location } =
    state;

  function set(payload) {
    dispatch({ type: "SET_VALUE", payload });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      ...state,
      startTime: buildDateTime(date, startTime),
      endTime: buildDateTime(date, endTime),
    };

    createEvent(payload, { onSuccess: onCloseModal });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-6 p-8 md:min-w-[35rem]">
        <div>
          <Heading as="h2">Criar Evento</Heading>
          <span>Criar evento novo para este team</span>
        </div>

        <Input
          label="Título"
          value={title}
          setValue={(v) => set({ title: v })}
        />

        <Input
          label="Descrição"
          value={description}
          setValue={(v) => set({ description: v })}
        />

        <Input
          type="date"
          label="Data"
          value={date}
          setValue={(v) => set({ date: v })}
        />

        {date && (
          <div className="flex gap-8 w-full">
            <Input
              type="time"
              label="Hora de Início"
              value={startTime}
              setValue={(v) => set({ startTime: v })}
            />
            <Input
              type="time"
              label="Hora de Término"
              value={endTime}
              setValue={(v) => set({ endTime: v })}
            />
          </div>
        )}

        <div className="flex flex-col gap-3">
          <label>Tipo de Evento</label>
          <div className="flex gap-6 text-secondary-text-color">
            {[
              { id: "call", label: "Video Chamada", value: "video-call" },
              { id: "presencial", label: "Presencial", value: "presential" },
            ].map(({ id, label, value }) => (
              <label
                key={id}
                htmlFor={id}
                className="flex gap-2 cursor-pointer"
              >
                <input
                  id={id}
                  type="checkbox"
                  checked={type === value}
                  onChange={() => set({ type: value, location: "" })}
                />
                {label}
              </label>
            ))}
          </div>

          {type === "presential" && (
            <Input
              label="Localização"
              value={location}
              setValue={(v) => set({ location: v })}
            />
          )}
        </div>

        <Button disabled={isPending}>
          {isPending ? <SpinnerMini /> : "Criar Evento"}
        </Button>
      </div>
    </form>
  );
}

export default CreateEventForm;
