import { NextResponse } from 'next/server';
import { postsDb } from '@/lib/posts-db';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    
    let posts = await postsDb.getAll();

    if (status) {
      posts = posts.filter(post => post.status === status);
    }

    if (category) {
      posts = posts.filter(post => post.category === category);
    }

    // Sort by publishedAt desc for published posts, or date for others
    posts.sort((a, b) => {
        const dateA = new Date(a.publishedAt || a.date).getTime();
        const dateB = new Date(b.publishedAt || b.date).getTime();
        return dateB - dateA;
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Basic validation
    if (!body.title || !body.slug) {
      return NextResponse.json(
        { error: 'Title and slug are required' }, 
        { status: 400 }
      );
    }

    const newPost = await postsDb.create(body);
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error('Failed to create post:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create post' }, 
      { status: 500 }
    );
  }
}
