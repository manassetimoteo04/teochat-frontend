import { useState } from "react";

const weekdays = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];
const times = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));

const data = [-3, -2, -1, 0, 1, 2, 3];
export function useScheduleWeek() {
  const [list, setList] = useState(data);
  const today = new Date(Date.now());
  const days = list.map((day) =>
    new Date(Date.now()).setDate(today.getDate() + day)
  );
  const dates = days.map((day) => new Date(day).toDateString());
  const title = `${new Date(days.at(0)).toDateString()}  —  ${new Date(
    days.at(-1)
  ).toDateString()}`;
  function handleNext() {
    setList((array) => array.map((item) => item + 7));
  }
  function handlePrev() {
    setList((array) => array.map((item) => item - 7));
  }
  return { dates, weekdays, times, days, title, handleNext, handlePrev };
}
