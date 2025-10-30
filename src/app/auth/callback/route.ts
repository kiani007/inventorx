import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

/**
 * Auth Callback Route
 * 
 * Handles email verification callback from Supabase.
 * Now supports two-phase signup flow:
 * 1. Exchange code for session
 * 2. Check for pending profile creation
 * 3. Redirect appropriately
 * 
 * Note: Profile completion happens client-side after redirect
 * because we need to access localStorage for pending signup data.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');
  const errorDescription = searchParams.get('error_description');

  // Handle errors from Supabase
  if (error) {
    console.error('Auth callback error:', error, errorDescription);
    return NextResponse.redirect(
      `${origin}/auth/auth-code-error?error=${encodeURIComponent(errorDescription || error)}`
    );
  }

  if (!code) {
    return NextResponse.redirect(`${origin}/auth/auth-code-error?error=missing_code`);
  }

  try {
    const supabase = await createClient();
    const { data, error: sessionError } = await supabase.auth.exchangeCodeForSession(code);
    
    if (sessionError || !data.session) {
      console.error('Failed to exchange code for session:', sessionError);
      return NextResponse.redirect(
        `${origin}/auth/auth-code-error?error=session_exchange_failed`
      );
    }

    console.log('✅ Email verified successfully for user:', data.user.id);

    // Check if user has a profile already
    const { data: profile } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', data.user.id)
      .single();

    const forwardedHost = request.headers.get('x-forwarded-host');
    const isLocalhost = origin.includes('localhost') || origin.includes('127.0.0.1');
    
    // Determine redirect URL
    let redirectUrl: string;
    if (isLocalhost) {
      // Force http:// for localhost (works in both dev and prod builds)
      redirectUrl = origin.replace('https://', 'http://');
    } else if (forwardedHost) {
      redirectUrl = `https://${forwardedHost}`;
    } else {
      redirectUrl = origin;
    }

    // If no profile exists, redirect to profile completion page
    // (client-side will handle retrieving pending data and creating profile)
    if (!profile) {
      console.log('📝 No profile found - redirecting to complete profile');
      return NextResponse.redirect(`${redirectUrl}/auth/complete-profile`);
    }

    // Profile exists - redirect to dashboard
    console.log('✅ Profile exists - redirecting to dashboard');
    return NextResponse.redirect(`${redirectUrl}/dashboard`);

  } catch (error) {
    console.error('Callback handler error:', error);
    return NextResponse.redirect(`${origin}/auth/auth-code-error?error=unexpected_error`);
  }
}

