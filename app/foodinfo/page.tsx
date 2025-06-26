import { FoodInfoPage } from "@/app/foodinfo/FoodInfoPage";
export const metadata = {
  title: "NutriSnap",
  description: "사진을 기반으로 분석된 음식의 영양 성분입니다.",
};

export default function FoodInfo() {
  return (
    <>
      <FoodInfoPage />
    </>
  );
}
