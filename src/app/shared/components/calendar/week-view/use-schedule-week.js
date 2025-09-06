import { useState } from "react";
import { formatDate } from "../../../utils/helpers";

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
  const title = `${formatDate(
    new Date(days.at(0)),
    true,
    true
  )}  —  ${formatDate(new Date(days.at(-1)), true, true)}`;
  function prev() {
    setList((array) => array.map((item) => item + 7));
  }
  function next() {
    setList((array) => array.map((item) => item - 7));
  }
  return { dates, weekdays, times, days, title, prev, next };
}
