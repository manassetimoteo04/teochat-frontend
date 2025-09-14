import clsx from "clsx";

function ButtonIcon({ children, onClick, active, title = "Clicar" }) {
  return (
    <button
      title={title}
      onClick={onClick}
      className={clsx(
        "text-secondary-text-color hover:text-main-text-color",
        active && "!text-main-text-color "
      )}
    >
      {children}
    </button>
  );
}

export default ButtonIcon;
