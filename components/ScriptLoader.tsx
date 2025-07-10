"use client";

import { usePathLocale } from "@/utils/hooks/usePathLocale";
import Script from "next/script";
import { useEffect, useState } from "react";

export default function ScriptLoader() {
  const kakaoKey = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;
  const nowLocale = usePathLocale();

  const [locale, setLocale] = useState("ko");
  useEffect(() => {
    console.log("nowLocale", nowLocale);
    setLocale(nowLocale);
  }, []);

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
      {/*
      프로펠러 영역 광고
      ko 아닐 경우에만 노출
      */}
      {locale !== "ko" && (
        <>
          <Script id="gizokraijaw.net">{`(function(d,z,s){s.src='https://'+d+'/401/'+z;try{(document.body||document.documentElement).appendChild(s)}catch(e){}})('gizokraijaw.net',9544237,document.createElement('script'))`}</Script>
          <Script id="vemtoutcheeg.com">{`(function(d,z,s){s.src='https://'+d+'/400/'+z;try{(document.body||document.documentElement).appendChild(s)}catch(e){}})('vemtoutcheeg.com',9543175,document.createElement('script'))`}</Script>
          <Script id="groleegni.net">{`(function(d,z,s){s.src='https://'+d+'/401/'+z;try{(document.body||document.documentElement).appendChild(s)}catch(e){}})('groleegni.net',9545149,document.createElement('script'))`}</Script>
        </>
      )}
    </>
  );
}
