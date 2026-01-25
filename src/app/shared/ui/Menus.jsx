import {
  cloneElement,
  createContext,
  useContext,
  useRef,
  useState,
} from "react";
import { Ellipsis } from "lucide-react";
import ButtonIcon from "./button-icon";
import { useOutsideClick } from "../hooks/use-outsideclick";

const MenuContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState(null);
  const [positions, setPositions] = useState();
  const close = () => setOpenId(null);
  const open = (id) => setOpenId(id);

  return (
    <MenuContext.Provider
      value={{ openId, setOpenId, close, open, positions, setPositions }}
    >
      {children}
    </MenuContext.Provider>
  );
}

function Toggle({ id, children }) {
  const ref = useRef();
  const { openId, close, open, setPositions } = useContext(MenuContext);
  const handleClick = (e) => {
    e.stopPropagation();
    const rect = e.target.closest("button").getBoundingClientRect();
    ref.current = e.target.closest("button");
    setPositions({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
      children: children ? true : false,
    });
    openId === "" || openId !== id ? open(id) : close();
  };

  if (children) return cloneElement(children, { onClick: handleClick });
  return (
    <ButtonIcon title="Ver opções" onClick={handleClick}>
      <Ellipsis size={20} />
    </ButtonIcon>
  );
}

function Menu({ id, children }) {
  const { openId } = useContext(MenuContext);

  if (id !== openId) return;
  return <>{children}</>;
}

function List({ children }) {
  const { close, positions } = useContext(MenuContext);
  const ref = useOutsideClick(close, false);

  const styles = positions
    ? { top: positions.y + "px", right: positions.x + "px", position: "fixed" }
    : null;
  return (
    <div
      ref={ref}
      style={styles}
      className={`z-[999] flex flex-col overflow-hidden right-[30px] top-[6rem] absolute
       rounded-xl shadow bg-white border-1 border-border-light`}
    >
      {children}
    </div>
  );
}
function Header({ children }) {
  return (
    <span className="text-[1.4rem] text-text-primary p-[0.4rem_0.8rem] not-first:border-t-1 border-b-1 bg-secondary-bg border-border-light font-medium">
      {children}
    </span>
  );
}
function ButtonMenu({
  icon,
  children,
  onClick = () => {},
  active,
  danger = false,
  onCloseOptions = () => {},
}) {
  const { close } = useContext(MenuContext);

  function handleClick() {
    onClick();
    close();
    onCloseOptions();
  }
  return (
    <button
      onClick={handleClick}
      className={`flex gap-[0.5rem] p-[0.5rem_1rem] items-center cursor-pointer text-text-secondary  hover:bg-gray-100 
        ${
          active
            ? "bg-primary !text-text-inverse hover:bg-primary"
            : "text-text-secondary"
        }
        ${danger ? "bg-danger-bg !text-danger " : ""}
      `}
    >
      {icon} {children}
    </button>
  );
}

Menus.Menu = Menu;
Menus.List = List;
Menus.Header = Header;
Menus.Button = ButtonMenu;
Menus.Toggle = Toggle;
export default Menus;
