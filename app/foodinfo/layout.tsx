import { ReactNode } from "react";
export const metadata = {
  title: "NutriSnap FoodInfo",
  description: "사진을 기반으로 분석된 음식의 영양 성분입니다.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
