"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useBackHandler(onBack: () => void) {
  useEffect(() => {
    const handlePop = (e: PopStateEvent) => {
      e.preventDefault();
      onBack();
    };

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handlePop);

    return () => {
      window.removeEventListener("popstate", handlePop);
    };
  }, [onBack]);
}
