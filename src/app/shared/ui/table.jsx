import { createContext, useContext } from "react";
import { clsx } from "clsx";
const TableProvider = createContext();
function Table({ children, columns }) {
  return (
    <TableProvider.Provider value={{ columns }}>
      {children}
    </TableProvider.Provider>
  );
}

function Header({ children }) {
  const { columns } = useContext(TableProvider);
  return (
    <header style={{ gridTemplateColumns: columns }} className={clsx("grid")}>
      {children}
    </header>
  );
}
function Row({ children }) {
  const { columns } = useContext(TableProvider);
  return (
    <div style={{ gridTemplateColumns: columns }} className={clsx("grid")}>
      {children}
    </div>
  );
}
function Body({ data, render }) {
  return <div>{data.map(render)}</div>;
}
function Footer({ children }) {
  return <div>{children}</div>;
}
Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;
export default Table;
