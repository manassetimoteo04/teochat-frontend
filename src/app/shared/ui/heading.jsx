import clsx from "clsx";

function Heading({ as = "h3", children }) {
  const Component = as;
  const styles = {
    h2: "md:text-[2.4rem] text-[1.8rem] font-semibold",
    h3: "text-[1.8rem]  font-semibold",
  };
  return (
    <Component className={clsx("text-main-text-color", styles[as])}>
      {children}
    </Component>
  );
}

export default Heading;
