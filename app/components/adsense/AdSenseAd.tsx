// components/AdSenseAd.js (또는 AdSenseAd.tsx)
import React, { useEffect } from "react";

const AdSenseAd = ({ adSlot }: { adSlot: string }) => {
  useEffect(() => {
    try {
      // window.adsbygoogle가 로드되었는지 확인
      if (typeof window !== "undefined" && window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []); // 컴포넌트 마운트 시 한 번만 실행

  if (process.env.NODE_ENV !== "production") {
    // 개발 환경에서는 광고를 표시하지 않음 (선택 사항)
    return (
      <div style={{ background: "#eee", padding: "10px", textAlign: "center" }}>
        AdSense Ad Slot: {adSlot} (개발 모드)
      </div>
    );
  }

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }} // 또는 원하는 스타일
      data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID}
      data-ad-slot={adSlot}
      data-ad-format="auto" // 또는 "fluid", "rectangle" 등
      data-full-width-responsive="true" // 반응형 광고를 위해
    ></ins>
  );
};

export default AdSenseAd;
