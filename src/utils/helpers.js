const getDate = (date) =>
  new Intl.DateTimeFormat("PT-ao", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

export function groupMessagesByDate(list) {
  console.log(list);
  const dates = Array.from(new Set(list?.map((cur) => getDate(cur.sendAt))));
  return dates?.map((curr) => {
    return {
      date: curr,
      messages: list.filter((msg) => getDate(msg.sendAt) === curr),
    };
  });
}
