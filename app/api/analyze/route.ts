import { NextResponse } from 'next/server';
import { analyzeFoodImage } from '@/lib/gemini';

export async function POST(request: Request) {
  try {
    const { image } = await request.json();

    if (!image) {
      return NextResponse.json({ error: 'Image data is required' }, { status: 400 });
    }

    const foodInfo = await analyzeFoodImage(image);
    return NextResponse.json(foodInfo);
  } catch (error: any) {
    console.error('API route error:', error);
    const errorMessage = error.message || 'An internal server error occurred.';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
