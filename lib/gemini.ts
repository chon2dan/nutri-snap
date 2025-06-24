import { Part, SchemaType } from "@google/generative-ai";
import { GoogleGenAI } from "@google/genai";
import { FoodInfoType } from "../types";

// 데이터 URL을 GoogleGenerativeAI.Part 객체로 변환하는 함수
function dataUrlToGenerativePart(dataUrl: string): Part {
  const match = dataUrl.match(/^data:(.+);base64,(.+)$/);
  if (!match) {
    throw new Error(
      'Invalid data URL format. Expected "data:[mime-type];base64,[data]".'
    );
  }
  const mimeType = match[1];
  const data = match[2];
  return {
    inlineData: {
      mimeType,
      data,
    },
  };
}

/**
 * 음식 이미지 분석 함수
 * @param imageData - Base64 형식의 이미지 데이터
 * @returns Promise<FoodInfoType[]> - 음식 정보 배열
 * @throws Error - 이미지 데이터가 올바르지 않거나 API 호출 중 오류 발생 시
 */
export async function analyzeFoodImage(
  imageData: string
): Promise<FoodInfoType[]> {
  try {
    const genAI = new GoogleGenAI({
      apiKey: process.env.GOOGLE_API_KEY || "",
    });

    // 이미지 데이터가 제공되지 않았는지 확인
    if (!imageData) {
      throw new Error("이미지 데이터가 제공되지 않았습니다.");
    }

    // 데이터 URL을 Generative AI Part로 변환
    const { inlineData } = dataUrlToGenerativePart(imageData);
    if (!inlineData || !inlineData.data || !inlineData.mimeType) {
      throw new Error("이미지 데이터가 올바르지 않습니다.");
    }

    // Gemini API를 사용하여 음식 이미지 분석 요청
    // 프롬프트 텍스트를 정의
    const promptText = `Food Image Analysis Request
        Analysis Goal: Identify the types of food within the image and provide detailed nutritional information for each food item (per dish).

        Detailed Analysis Guidelines:

        Food Identification Unit:

        Dish/Bowl Unit: Analyze food as complete dishes served in a plate or bowl, not as individual ingredients.
        Clear Separation: If multiple types of food are clearly separated on a single plate, treat each as a distinct dish for analysis.
        Example 1: If steak, mashed potatoes, and a salad are on one plate, analyze them as three separate dishes: 'Steak', 'Mashed Potatoes', and 'Salad'.
        Example 2: If a salmon rice bowl (donburi) contains salmon, wasabi, rice, seaweed, and radish sprouts, analyze it as a single dish: 'Salmon Rice Bowl'. Do not separate and analyze individual ingredients.
        Sauces: For sauces that are difficult to distinguish visually (e.g., salt, sugar, chili sauce, ketchup), estimate and include the most common sauce that would typically accompany the food.
        Information to Provide (Per 100g):

        Food Name: State the accurate name of the food item.
        Estimated Food Weight: Provide the approximate estimated weight of the food item in the image in grams (g).
        Nutritional Information: Provide the following nutritional details per 100g:
        Calories: In kcal units.
        Carbohydrates: In g units.
        Protein: In g units.
        Fat: In g units.

        Think step by step and derive results so that consistent results can be obtained even when requesting the same image multiple times.

        Please make sure your answer is in Korean only.
      `;

    const contents = [
      { text: promptText },
      {
        inlineData: {
          mimeType: inlineData.mimeType,
          data: inlineData.data,
        },
      },
    ];

    const result = await genAI.models.generateContent({
      model: "gemini-2.5-flash-lite-preview-06-17",
      contents: contents,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: SchemaType.OBJECT,
          properties: {
            foods: {
              type: SchemaType.ARRAY,
              items: {
                type: SchemaType.OBJECT,
                properties: {
                  name: {
                    type: SchemaType.STRING,
                    description: "과일 또는 음식의 이름",
                  },
                  calories: {
                    type: SchemaType.INTEGER,
                    description: "칼로리 (단위: kcal)",
                  },
                  carbs: {
                    type: SchemaType.INTEGER,
                    description: "탄수화물 (단위: g)",
                  },
                  protein: {
                    type: SchemaType.NUMBER,
                    description: "단백질 (단위: g)",
                  },
                  fat: {
                    type: SchemaType.NUMBER,
                    description: "지방 (단위: g)",
                  },
                  estimatedFoodWeight: {
                    type: SchemaType.NUMBER,
                    description: "추정 음식 무게 (단위: g)",
                  },
                },
                required: [
                  "name",
                  "calories",
                  "carbs",
                  "protein",
                  "fat",
                  "estimatedFoodWeight",
                ],
              },
            },
          },
          required: ["foods"],
        },
      },
    });

    const text = await result.text;
    try {
      const parsedData: { foods: FoodInfoType[] } = JSON.parse(
        text ? text : "[]"
      );
      console.log(JSON.stringify(parsedData.foods, null, 2));
      return parsedData.foods;
    } catch (error) {
      console.error("Error parsing JSON:", error);
      console.error("Raw response text:", text);
      throw new Error("Failed to parse food data from the image.");
    }
  } catch (error) {
    console.error("Gemini API 호출 중 오류 발생:", error);
    if (error instanceof Error) {
      throw new Error(`Gemini API Error: ${error.message}`);
    }
    throw new Error("음식 이미지 분석 중 알 수 없는 오류가 발생했습니다.");
  }
}
