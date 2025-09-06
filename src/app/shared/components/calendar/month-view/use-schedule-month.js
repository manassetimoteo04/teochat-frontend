import { useEffect, useState } from "react";
import { eachDayOfInterval, startOfMonth, endOfMonth } from "date-fns";

const weekdays = ["dom.", "seg.", "ter.", "qua.", "qui.", "sex.", "sáb."];

function getDaysInMonth(year, month) {
  const start = startOfMonth(new Date(year, month));
  const end = endOfMonth(new Date(year, month));
  return eachDayOfInterval({ start, end });
}

export function useScheduleMonth() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const days = getDaysInMonth(2025, 8);
  const passedDays = [];
  const nextDays = [];
  const start = new Date(days.at(0));
  const end = days.at(-1);
  if (start.getDay() >= 1) {
    for (let index = 0; index < start.getDay(); index++) {
      const date = new Date(days.at(0));
      date.setDate(start.getDate() - index - 1);
      passedDays.unshift(date);
    }
  }
  if (end.getDay() < weekdays.length) {
    for (let index = 0; index < weekdays.length - end.getDay() - 1; index++) {
      const date = new Date(days.at(0));
      date.setDate(start.getDate() + index);
      nextDays.push(date);
    }
  }
  const finalList = Array.from([...passedDays, ...days, ...nextDays]);
  useEffect(() => {}, []);

  return { list: finalList, weekdays };
}
