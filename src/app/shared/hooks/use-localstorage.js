import { useState } from "react";

export function useLocalStorage(key) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : null;
  });
  function setToLocalStorage(value) {
    localStorage.setItem(key, value);
    setValue(value);
  }
  function removeToLocalStorage() {
    localStorage.removeItem(key);
    setValue(null);
  }
  return { value, setToLocalStorage, removeToLocalStorage };
}
