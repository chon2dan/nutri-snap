import { GoogleGenerativeAI, Part, SchemaType } from '@google/generative-ai';
import { FoodInfoType } from '../types';


// 데이터 URL을 GoogleGenerativeAI.Part 객체로 변환하는 함수
function dataUrlToGenerativePart(dataUrl: string): Part {
  const match = dataUrl.match(/^data:(.+);base64,(.+)$/);
  if (!match) {
    throw new Error('Invalid data URL format. Expected "data:[mime-type];base64,[data]".');
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

export async function analyzeFoodImage(imageData: string): Promise<FoodInfoType[]> {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash-latest",
    });

    const prompt = `Analyze the food in this image. I need to analyze the food in very detailed units and tell you. Provide its name and nutritional information per 100g (calories, carbohydrates, protein, and fat). And return me food names into Korean.`;

    const imagePart = dataUrlToGenerativePart(imageData);

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [imagePart, { text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: SchemaType.OBJECT,
          properties: {
            foods: {
              type: SchemaType.ARRAY,
              items: {
                type: SchemaType.OBJECT,
                properties: {
                  name: { type: SchemaType.STRING, description: "과일 또는 음식의 이름" },
                  calories: { type: SchemaType.INTEGER, description: "칼로리 (단위: kcal)" },
                  carbs: { type: SchemaType.INTEGER, description: "탄수화물 (단위: g)" },
                  protein: { type: SchemaType.NUMBER, description: "단백질 (단위: g)" },
                  fat: { type: SchemaType.NUMBER, description: "지방 (단위: g)" },
                },
                required: ["name", "calories", "carbs", "protein", "fat"],
              }
            }
          },
          required: ["foods"]
        },
      },
    });

    const response = await result.response;
    const text = response.text();
    try {
      const parsedData: { foods: FoodInfoType[] } = JSON.parse(text);
      console.log(JSON.stringify(parsedData.foods, null, 2));
      return parsedData.foods;
    } catch (error) {
      console.error("Error parsing JSON:", error);
      console.error("Raw response text:", text);
      throw new Error("Failed to parse food data from the image.");
    }

  } catch (error) {
    console.error('Gemini API 호출 중 오류 발생:', error);
    if (error instanceof Error) {
      throw new Error(`Gemini API Error: ${error.message}`);
    }
    throw new Error('음식 이미지 분석 중 알 수 없는 오류가 발생했습니다.');
  }
}
