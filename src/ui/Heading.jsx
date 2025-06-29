function Heading({ children, size = "2.4rem" }) {
  return (
    <h3
      className={`text-[${size}] text-main-heading-color font-semibold dark:text-main-text-color-dark`}
    >
      {children}
    </h3>
  );
}

export default Heading;
