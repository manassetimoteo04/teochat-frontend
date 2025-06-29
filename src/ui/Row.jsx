import clsx from "clsx";

function Row({ type = "vertical", children }) {
  return (
    <div
      className={
        "flex gap-8 flex-col " + type === "horizontal" &&
        clsx`flex-row justify-between items-center`
      }
    >
      {" "}
      {children}
    </div>
  );
}

export default Row;
