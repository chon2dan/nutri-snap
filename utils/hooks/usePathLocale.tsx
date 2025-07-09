"use client";

import { usePathname } from "next/navigation";

export const usePathLocale = () => {
  const pathname = usePathname();
  // URL 경로의 첫 번째 부분이 항상 로케일입니다. (예: /en/about -> "en")
  // 경로가 "/"인 경우를 대비해 기본값을 설정합니다.
  const locale = pathname.split("/")[1];
  return locale || "ko";
};
