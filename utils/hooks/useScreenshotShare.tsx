import html2canvas from "html2canvas";

export const useScreenshotShare = () => {
  const captureElement = async (ref: React.RefObject<HTMLElement>) => {
    if (!ref.current) return null;

    await document.fonts.ready;

    const canvas = await html2canvas(ref.current, {
      backgroundColor: "#ffffff",
      scale: 2,
    });

    return await new Promise<Blob | null>((resolve) =>
      canvas.toBlob((b) => resolve(b), "image/png")
    );
  };

  const downloadFallback = (blobs: Blob[]) => {
    blobs.forEach((blob, index) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `screenshot-${index + 1}.png`;
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  const shareScreenshot = async (refs: React.RefObject<HTMLElement>[]) => {
    try {
      const blobs = await Promise.all(refs.map(captureElement));
      const validBlobs = blobs.filter((b): b is Blob => !!b);

      if (validBlobs.length === 0)
        throw new Error("이미지를 캡처할 수 없습니다.");

      const files = validBlobs.map(
        (blob, i) =>
          new File([blob], `screenshot-${i + 1}.png`, { type: "image/png" })
      );

      if (navigator.canShare && navigator.canShare({ files })) {
        await navigator.share({
          title: document.title,
          text: "스크린샷 공유하기",
          files,
        });
      } else {
        alert(
          "이 브라우저는 공유를 지원하지 않아 이미지 다운로드로 대체합니다."
        );
        downloadFallback(validBlobs);
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
