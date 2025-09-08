import { useEffect, useRef, useState } from "react";

function calcTimePassed(date1, date2, type) {
  const types = {
    min: 1000 * 60,
    hour: 1000 * 60 * 60,
    day: 1000 * 60 * 60 * 24,
  };
  return Math.round(Math.abs(date2 - date1) / types[type]);
}
const formatDate = function (
  date,
  fullDate = false,
  string = false,
  locale = "pt-AO"
) {
  const opts = string
    ? {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    : {};
  if (fullDate) return new Intl.DateTimeFormat(locale, opts).format(date);
  const daysPassed = calcTimePassed(new Date(), date, "day");

  if (daysPassed === 0) {
    const hourPassed = calcTimePassed(new Date(), date, "hour");
    if (hourPassed === 0) {
      const minPassed = calcTimePassed(new Date(), date, "min");
      return `há ${minPassed} min`;
    }
    if (hourPassed > 0) return `há ${hourPassed} horas`;
    return "Hoje";
  }
  if (daysPassed === 1) return "Ontem";
  if (daysPassed <= 7) return `há ${daysPassed} dias`;

  return new Intl.DateTimeFormat(locale).format(date);
};

const getDaysBefore = (settedDate) =>
  Array.from({ length: 3 }, (_, i) => i + 1)
    .map((day) => {
      const date = new Date(
        new Date(settedDate).setDate(new Date(settedDate).getDate() - day)
      ).toDateString();
      return date;
    })
    .reverse();
const getDaysAfter = (settedDate) =>
  Array.from({ length: 3 }, (_, i) => i + 1).map((day) => {
    const date = new Date(
      new Date(settedDate).setDate(new Date(settedDate).getDate() + day)
    ).toDateString();
    return date;
  });
function buildScheduleDatesList(day = new Date()) {
  const dates = [
    ...getDaysBefore(day),
    new Date(day).toDateString(),
    ...getDaysAfter(day),
  ];
  return dates;
}
const updateScheduleDays = (date, increment) => {
  return new Date(date).setDate(new Date(date).getDate() + increment);
};
const weekdays = ["dom.", "seg.", "ter.", "qua.", "qui.", "sex.", "sáb."];
const hours = Array.from(
  { length: 24 },
  (_, i) => String(i).padStart(2, "0") + ":30"
);

// const hours = [
//   "08:30",
//   "09:30",
//   "10:30",
//   "11:30",
//   "12:30",
//   "13:30",
//   "14:30",
//   "15:30",
//   "16:30",
//   "17:30",
//   "18:30",
//   "19:30",
//   "20:30",
// ];
function useScheduleDay(list) {
  const inputRef = useRef();
  const [days, setDays] = useState(buildScheduleDatesList());
  const [pickDate, setPickDate] = useState();
  let increment = 0;
  const isToday = (day) =>
    new Date(day).toDateString() === new Date().toDateString();
  const next = () => {
    increment++;
    setDays((d) => d.map((d) => updateScheduleDays(d, increment)));
  };
  const prev = () => {
    increment--;
    setDays((d) => d.map((d) => updateScheduleDays(d, increment)));
  };
  const currentDay = new Date(days.at(3)).toDateString();
  const filteredList = list.filter(
    (app) => new Date(app.date).toDateString() === currentDay
  );
  const handleInputCalendarClick = () => {
    inputRef.current.showPicker();
  };
  useEffect(() => {
    if (!pickDate) return;
    setDays(buildScheduleDatesList(pickDate));
  }, [pickDate]);
  const title = formatDate(new Date(currentDay), true, true);
  return {
    handleInputCalendarClick,
    filteredList,
    next,
    prev,
    isToday,
    setPickDate,
    title,
    hours,
    days,
    setDays,
    buildScheduleDatesList,
    weekdays,
  };
}

export default useScheduleDay;
