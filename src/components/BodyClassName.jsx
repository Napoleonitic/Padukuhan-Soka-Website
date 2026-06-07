"use client";

import { useEffect } from "react";

export function BodyClassName({ className }) {
  useEffect(() => {
    document.body.classList.add(className);

    return () => {
      document.body.classList.remove(className);
    };
  }, [className]);

  return null;
}
