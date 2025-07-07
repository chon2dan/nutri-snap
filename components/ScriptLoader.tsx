"use client";

import Script from "next/script";

export default function ScriptLoader() {
  const kakaoKey = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;

  return (
    <>
      <Script
        src="https://developers.kakao.com/sdk/js/kakao.js"
        strategy="beforeInteractive"
      />
      <Script id="kakao-init" strategy="beforeInteractive">
        {`
          if (window.Kakao && !window.Kakao.isInitialized) {
            window.Kakao.init("${kakaoKey}");
          }
        `}
      </Script>
      <Script
        async
        src={
          "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8528921782994510"
        }
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
    </>
  );
}
