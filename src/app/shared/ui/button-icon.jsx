function ButtonIcon({ children, onClick, title = "Clicar" }) {
  return (
    <button
      title={title}
      onClick={onClick}
      className="text-secondary-text-color hover:text-main-text-color"
    >
      {children}
    </button>
  );
}

export default ButtonIcon;
