import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

// API route for on-demand revalidation triggered by Sanity webhooks
export async function POST(request: NextRequest) {
  try {
    // Verify the request is coming from Sanity (optional but recommended)
    const secret = request.nextUrl.searchParams.get('secret');
    
    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json(
        { message: 'Invalid secret' },
        { status: 401 }
      );
    }

    const body = await request.json();
    
    // Get the type of document that was updated
    const { _type, slug } = body;

    if (_type === 'blogPost' && slug?.current) {
      // Revalidate specific blog post page
      await revalidatePath(`/blog/${slug.current}`);
      
      // Also revalidate the blog listing page
      await revalidatePath('/blog');
      
      return NextResponse.json({
        revalidated: true,
        now: Date.now(),
        paths: [`/blog/${slug.current}`, '/blog'],
      });
    }

    if (_type === 'blogPost') {
      // If no slug, just revalidate blog listing
      await revalidatePath('/blog');
      
      return NextResponse.json({
        revalidated: true,
        now: Date.now(),
        paths: ['/blog'],
      });
    }

    // For category or author updates, revalidate all blog pages
    if (_type === 'blogCategory' || _type === 'blogAuthor') {
      await revalidatePath('/blog');
      
      return NextResponse.json({
        revalidated: true,
        now: Date.now(),
        paths: ['/blog'],
      });
    }

    return NextResponse.json({
      message: 'No revalidation needed',
      now: Date.now(),
    });
  } catch (err) {
    console.error('Error revalidating:', err);
    return NextResponse.json(
      { message: 'Error revalidating', error: String(err) },
      { status: 500 }
    );
  }
}

