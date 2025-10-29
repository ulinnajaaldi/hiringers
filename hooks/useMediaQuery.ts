"use client";

import { useEffect, useState } from "react";

export function useMediaQuery(query: string) {
  const [value, setValue] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    const result = window.matchMedia(query);

    function onChange(event: MediaQueryListEvent) {
      setValue(event.matches);
    }

    result.addEventListener("change", onChange);

    return () => {
      result.removeEventListener("change", onChange);
    };
  }, [query]);

  return value;
}
