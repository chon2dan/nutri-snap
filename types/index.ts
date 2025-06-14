export interface FoodInfoType {
  name: string;
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
}

export type MacroInput = {
  carb: number;    // 탄수화물 (g)
  protein: number; // 단백질 (g)
  fat: number;     // 지방 (g)
};

