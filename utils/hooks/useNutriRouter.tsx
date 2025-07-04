"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const STORAGE_KEY = "__route_data";

export function useNutriRouter<T = any>() {
  const router = useRouter();
  const [routeData, setRouteData] = useState<T | null>(null);

  // routeData 가져오기 (초기 1회)
  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setRouteData(JSON.parse(stored));
        //sessionStorage.removeItem(STORAGE_KEY); // 한 번 쓰고 제거
      } catch (e) {
        console.error("Failed to parse routeData", e);
      }
    }
  }, []);

  // push with routeData
  function push(path: string, options?: { routeData?: T }) {
    if (options?.routeData) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(options.routeData));
    }
    router.push(path);
  }

  return { router, push, routeData };
}
