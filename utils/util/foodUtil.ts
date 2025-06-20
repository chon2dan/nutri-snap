import { FoodInfoType } from "@/types";

export const calculateTotalNutrientByEstimatedFoodWeight = (
  food: FoodInfoType[]
) => {
  return {
    totalCarb: Math.floor(
      Number(
        food.reduce(
          (total, item) =>
            total + (item.carbs * item.estimatedFoodWeight) / 100,
          0
        )
      )
    ),
    totalProtein: Math.floor(
      Number(
        food.reduce(
          (total, item) =>
            total + (item.protein * item.estimatedFoodWeight) / 100,
          0
        )
      )
    ),
    totalFat: Math.floor(
      Number(
        food.reduce(
          (total, item) => total + (item.fat * item.estimatedFoodWeight) / 100,
          0
        )
      )
    ),
    totalCalories: Math.floor(
      Number(
        food.reduce(
          (total, item) =>
            total + (item.calories * item.estimatedFoodWeight) / 100,
          0
        )
      )
    ),
    totalEstimatedFoodWeight: Math.floor(
      Number(food.reduce((total, item) => total + item.estimatedFoodWeight, 0))
    ),
  };
};
