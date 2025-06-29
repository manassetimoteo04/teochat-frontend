function ButtonIcon({ onClick, children, title, hidden }) {
  return (
    <button
      title={title}
      onClick={onClick}
      className={`${hidden} sm:flex  text-[2.4rem] text-secondary-text-color dark:text-secondary-text-color-dark flex items-center  justify-center`}
    >
      {children}
    </button>
  );
}

export default ButtonIcon;
