import { ReactNode } from "react";
import { Providers } from "./providers/providers";
import "./globals.css";
import ScriptLoader from "@/components/ScriptLoader";
import { getCurrentLocale, getI18n } from "@/app/i18n/i18n";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getI18n();

  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
    keywords: [
      t("metadata.keywords.0"),
      t("metadata.keywords.1"),
      t("metadata.keywords.2"),
      t("metadata.keywords.3"),
      t("metadata.keywords.4"),
      t("metadata.keywords.5"),
      t("metadata.keywords.6"),
      t("metadata.keywords.7"),
    ],
    openGraph: {
      title: t("metadata.title"),
      description: t("metadata.description"),
      url: "https://nutri-snap.kro.kr",
      type: "website",
    },
  };
}

// keywords: [
//   "음식 사진 영양정보",
//   "AI 음식 분석",
//   "음식 인식 AI",
//   "사진으로 영양정보 확인",
//   "식단 분석",
//   "칼로리 분석기",
//   "자동 음식 감지",
//   "음식별 영양 성분",
// ],
// openGraph: {
//   title: "사진만 올리면 끝! AI 음식 분석기로 영양정보 확인",
//   description:
//     "AI가 음식 사진을 자동 인식하고 정확한 영양성분을 제공합니다. 식단 관리가 필요한 모든 이들을 위한 스마트 솔루션!",
//   url: "https://nutri-snap.kro.kr",
//   type: "website",
// },

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const locale = await getCurrentLocale();

  return (
    <html lang={locale}>
      <head>
        <ScriptLoader />
      </head>
      <body>
        <Providers locale={locale}>{children}</Providers>
      </body>
    </html>
  );
}
