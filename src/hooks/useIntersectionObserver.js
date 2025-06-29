import { useEffect, useRef, useState } from "react";

export function useIntersectionObserver() {
  const [intersecting, setIntersecting] = useState(true);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        console.log(entry);
        if (!entry.isIntersecting) {
          setIntersecting(false);
        } else setIntersecting(true);
      },
      {
        root: null,
        threshold: 0,
      }
    );
    observer.observe(ref.current);
  }, []);
  return { ref, intersecting };
}
