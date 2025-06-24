import { useEffect } from "react";

const KakaoAdFitAd = ({
  adUnitId,
  width,
  height,
}: {
  adUnitId: string;
  width?: number;
  height?: number;
}) => {
  useEffect(() => {
    try {
      // window.kakaoAdFit 스크립트가 로드되었는지 확인
      if (typeof window !== "undefined" && window.kakaoAdFit) {
        window.kakaoAdFit.display(adUnitId);
      } else {
        // 스크립트 로딩이 늦어지는 경우를 대비하여 재시도 로직 추가 (선택 사항)
        const checkAdFit = setInterval(() => {
          if (typeof window !== "undefined" && window.kakaoAdFit) {
            window.kakaoAdFit.display(adUnitId);
            clearInterval(checkAdFit);
          }
        }, 500); // 0.5초마다 체크
      }
    } catch (e) {
      console.error("Kakao AdFit error:", e);
    }
  }, [adUnitId]); // adUnitId가 변경될 때마다 실행

  // 개발 환경에서는 광고 대신 표시될 placeholder
  if (process.env.NODE_ENV !== "production") {
    return (
      <div
        style={{
          width: width ? `${width}px` : "100%",
          height: height ? `${height}px` : "100px", // 기본 높이 설정
          background: "#f0f0f0",
          border: "1px dashed #ccc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "14px",
          color: "#555",
          margin: "10px 0",
        }}
      >
        AdFit Ad Slot: {adUnitId} (개발 모드)
      </div>
    );
  }

  // 실제 광고 단위 렌더링
  return (
    <ins
      className="kakao_ad_area"
      style={{
        display: "block",
        width: width ? `${width}px` : "100%",
        height: height ? `${height}px` : "auto", // 높이 auto 또는 고정값
      }}
      data-ad-unit-id={adUnitId}
      // data-ad-width={width} // 필요시 고정 너비 지정
      // data-ad-height={height} // 필요시 고정 높이 지정
    ></ins>
  );
};

export default KakaoAdFitAd;
