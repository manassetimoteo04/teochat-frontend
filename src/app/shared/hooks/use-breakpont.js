import { useEffect, useState } from "react";

export function useBreakpoint() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return {
    width,
    isXs: width < 640,
    isSm: width >= 640 && width < 768,
    isMd: width >= 768 && width < 1024,
    isLg: width >= 1024 && width < 1280,
    isXl: width >= 1280,
  };
}
