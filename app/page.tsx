import MainPage from "./pages/MainPage/MainPage";
export const metadata = {
  title: "NutriSnap",
  description: "사진을 기반으로 분석된 음식의 영양 성분입니다.",
};

export default function Home() {
  return (
    <>
      <MainPage />
    </>
  );
}
