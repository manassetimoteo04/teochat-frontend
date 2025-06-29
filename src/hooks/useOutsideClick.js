import { useEffect, useRef } from "react";

export function useOutsideClick(handler, eventBubbling = true) {
  const ref = useRef();
  useEffect(() => {
    function event(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        handler();
        console.log(handler);
      }
    }
    document.addEventListener("click", event, eventBubbling);
    return document.removeEventListener("click", event);
  }, [handler, eventBubbling]);
  return ref;
}
