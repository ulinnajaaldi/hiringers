"use client";

import { useEffect, useState } from "react";

export function useMediaQuery(query: string) {
  const [value, setValue] = useState<boolean>(false);

  useEffect(() => {
    const result = window.matchMedia(query);

    function onChange(event: MediaQueryListEvent) {
      setValue(event.matches);
    }

    const rafId = requestAnimationFrame(() => {
      setValue(result.matches);
    });

    result.addEventListener("change", onChange);

    return () => {
      cancelAnimationFrame(rafId);
      result.removeEventListener("change", onChange);
    };
  }, [query]);

  return value;
}
