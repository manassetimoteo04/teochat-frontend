import {
  Children,
  cloneElement,
  createContext,
  useContext,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { useOutsideClick } from "../hooks/useOutsideClick";
const ModalContext = createContext();

function Modal({ children }) {
  const [open, setOpen] = useState(null);
  function onClose() {
    setOpen(null);
  }
  return (
    <ModalContext.Provider value={{ open, setOpen, onClose }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens }) {
  const { setOpen } = useContext(ModalContext);
  return cloneElement(children, {
    onClick: () => setOpen(opens),
  });
}
function Window({ children, name }) {
  const { open, onClose } = useContext(ModalContext);
  const ref = useOutsideClick(onClose);
  if (name !== open) return null;
  return createPortal(
    <div className="fixed top-0 left-0 bg-black/30 z-[9999999999999999999] backdrop-blur-sm overflow-y-scroll flex items-center justify-center w-full h-[100dvh]">
      <div
        ref={ref}
        className="bg-main-bg-color dark:bg-main-bg-color-dark border-[1px]   border-main-border-color dark:border-main-border-color-dark rounded-[1rem]"
      >
        {cloneElement(children, {
          onClose: onClose,
        })}
      </div>
    </div>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;
export default Modal;
