"use client";

declare global {
  interface Window {
    Kakao: any;
  }
}

interface ShareOptions {
  title?: string;
  description?: string;
  imageUrl?: string;
  url?: string;
}

export const useKakaoShare = () => {
  const share = ({
    title = "공유 제목",
    description = "공유 설명",
    imageUrl = "https://via.placeholder.com/300",
    url = window.location.href,
  }: ShareOptions = {}) => {
    if (!window.Kakao || !window.Kakao.Share || !window.Kakao.isInitialized()) {
      console.warn("Kakao SDK가 초기화되지 않았습니다.");
      return;
    }

    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title,
        description,
        imageUrl,
        link: {
          mobileWebUrl: url,
          webUrl: url,
        },
      },
      buttons: [
        {
          title: "웹으로 보기",
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
      ],
    });
  };

  return { share };
};
