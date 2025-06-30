import html2canvas from "html2canvas";

export const useScreenshotShare = () => {
  const shareScreenshot = async (targetRef: React.RefObject<HTMLElement>) => {
    if (!targetRef.current) return;

    try {
      const canvas = await html2canvas(targetRef.current, {
        backgroundColor: "#ffffff",
        scale: 2,
      });
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob((b) => resolve(b), "image/png")
      );

      if (!blob) throw new Error("이미지 생성 실패");

      const file = new File([blob], "screenshot.png", { type: "image/png" });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: document.title,
          text: "스크린샷 공유하기",
          files: [file],
        });
      } else {
        alert("이 브라우저는 파일 공유를 지원하지 않습니다.");
      }
    } catch (err) {
      if (
        err instanceof DOMException &&
        (err.name === "InvalidStateError" || err.name === "AbortError")
      ) {
        console.log("공유가 취소되었습니다.");
      } else {
        console.error("공유 중 오류 발생:", err);
      }
    }
  };

  return { shareScreenshot };
};
