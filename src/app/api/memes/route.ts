import { NextRequest, NextResponse } from 'next/server';
import { getMemes, saveMeme } from '@/lib/db-actions';

// GET /api/memes - Get all memes or memes for a specific user
export async function GET(request: NextRequest) {
  try {
    // In a Cloudflare Worker environment, DB would be available from the environment
    // For this example, we'll assume it's passed through or available globally
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    // Note: In a real Cloudflare Worker, you would get the DB from the environment
    // const env = { DB: context.env.DB };
    // const memes = await getMemes(env, userId || undefined);
    
    // For now, returning a placeholder response
    return NextResponse.json({ 
      message: 'Database connection would be used here',
      userId: userId || 'all users'
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch memes' }, { status: 500 });
  }
}

// POST /api/memes - Create a new meme
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { originalImage, caption, generatedImage, userId } = body;
    
    if (!originalImage || !caption) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    // Note: In a real Cloudflare Worker, you would get the DB from the environment
    // const env = { DB: context.env.DB };
    // const result = await saveMeme(env, originalImage, caption, generatedImage, userId);
    
    // For now, returning a placeholder response
    return NextResponse.json({ 
      message: 'Meme would be saved to database',
      data: { originalImage, caption, generatedImage, userId }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save meme' }, { status: 500 });
  }
} 