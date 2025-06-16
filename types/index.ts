export type FoodInfoType = {
  name: string;
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
  estimatedFoodWeight: number; // 추정 음식 무게 (g)
};

export type MacroInput = {
  carb: number; // 탄수화물 (g)
  protein: number; // 단백질 (g)
  fat: number; // 지방 (g)
};
