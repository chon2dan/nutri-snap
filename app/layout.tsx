import { ReactNode } from "react";
import { Providers } from "./providers/Providers";
import "./globals.css";
import ScriptLoader from "@/components/ScriptLoader";
export const metadata = {
  title:
    "NutriSnap - AI 음식 사진 분석기 - 한 장의 사진으로 영양정보까지! | 영양 분석 AI 플랫폼",
  description:
    "사진 한 장만 업로드하면 AI가 음식 종류를 자동 인식하고 칼로리, 탄수화물, 단백질, 지방 등 영양정보를 100g 기준으로 제공합니다. 정확한 식단 분석이 필요할 땐 지금 바로 사용해보세요!",
  keywords: [
    "음식 사진 영양정보",
    "AI 음식 분석",
    "음식 인식 AI",
    "사진으로 영양정보 확인",
    "식단 분석",
    "칼로리 분석기",
    "자동 음식 감지",
    "음식별 영양 성분",
  ],
  openGraph: {
    title: "사진만 올리면 끝! AI 음식 분석기로 영양정보 확인",
    description:
      "AI가 음식 사진을 자동 인식하고 정확한 영양성분을 제공합니다. 식단 관리가 필요한 모든 이들을 위한 스마트 솔루션!",
    url: "https://nutri-snap.kro.kr",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <ScriptLoader />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
