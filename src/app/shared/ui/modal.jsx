import { X } from "lucide-react";
import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
const ModalContext = createContext();
function Modal({ children }) {
  const [open, setOpen] = useState(null);

  function close() {
    setOpen(null);
  }

  function onOpen(value) {
    setOpen(value);
  }

  return (
    <ModalContext.Provider value={{ open, close, onOpen }}>
      {children}
    </ModalContext.Provider>
  );
}

function Window({ id, children, buttonClose = true, onClose }) {
  const { close, open } = useContext(ModalContext);
  const handleClose = () => {
    onClose?.();
    close();
  };
  if (id !== open) return;
  return createPortal(
    <div className="fixed flex items-center z-[9999999] justify-center h-screen w-full top-0 left-0 bg-black/40">
      <div
        onClick={handleClose}
        className="absolute top-0 left-0 w-full h-dvh "
      ></div>
      <div className=" relative z-50 bg-white rounded-2xl overflow-y-scroll max-h-[calc(100dvh-4rem)]">
        {buttonClose && (
          <button
            onClick={handleClose}
            className="absolute right-[1rem] hover:text-main-text-color text-secondary-text-color top-[1rem]"
          >
            <X />
          </button>
        )}
        {cloneElement(children, { onCloseModal: handleClose })}
      </div>
    </div>,
    document.body,
  );
}
function Open({ id, children }) {
  const { onOpen } = useContext(ModalContext);
  return cloneElement(children, {
    onClick: (event) => {
      children.props?.onClick?.(event);
      onOpen(id);
    },
  });
}

Modal.Window = Window;
Modal.Open = Open;
export default Modal;
