function MessageBox({ message }) {
  const isMine = message?.isMine;
  // const before = isBeforeTheSame(index + 1) === message?.isMine || index === 0;
  const date = new Date(message?.sendAt);
  const sentTime = `${String(date.getHours()).padStart(2, "0")}:${String(
    date.getMinutes()
  ).padStart(2, 0)}`;
  return (
    <div
      className={`fadeInAnimation flex relative flex-col w-fit p-[1rem]   border-gray-200 rounded-[1.5rem] md:max-w-[29rem]  max-w-[25rem]
        after:w-[3rem] after:h-[1rem] after:top-[-0px] after:absolute 
  ${
    isMine
      ? " bg-main-color after:right-[-1rem] after:-skew-x-[50deg]  after:bg-main-color  after:rounded-r-[2rem] after:border-b-transparent after:border-l-transparent "
      : "self-start after:left-[-1rem] dark:bg-gray-800 dark:after:bg-gray-800 dark:text-main-text-color-dark text-main-text-color after:skew-x-[50deg] after:rounded-l-[2rem] after:bg-white  bg-white after:border-b-transparent after:border-r-transparent "
  } 
  `}
    >
      {message.text.split("\n").map((t) => {
        return <span className={t.trim() === "" ? "py-[10px]" : ""}>{t}</span>;
      })}
      <span className="text-[1rem] self-end text-secondary-text-color text-or dark:text-secondary-text-color-dark">
        {sentTime}
      </span>
    </div>
  );
}

export default MessageBox;
