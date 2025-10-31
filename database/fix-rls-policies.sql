-- ============================================
-- FIX RLS POLICIES FOR PROFILES TABLE
-- ============================================
-- Run this in Supabase SQL Editor to fix the 401 error
-- This drops and recreates all RLS policies properly

-- ============================================
-- 1. DROP ALL EXISTING POLICIES
-- ============================================

DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Public can read verified investors" ON public.profiles;
DROP POLICY IF EXISTS "Public can read verified inventors" ON public.profiles;

-- ============================================
-- 2. RECREATE RLS POLICIES WITH PROPER PERMISSIONS
-- ============================================

-- Policy: Users can read their own profile
CREATE POLICY "Users can read own profile"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Policy: Authenticated users can insert their own profile
-- This allows the signup flow to work properly
CREATE POLICY "Users can insert own profile"
  ON public.profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Policy: Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Policy: Public can read verified investor profiles (for directory)
CREATE POLICY "Public can read verified investors"
  ON public.profiles
  FOR SELECT
  TO anon, authenticated
  USING (
    role = 'INVESTOR' 
    AND email_verified = TRUE 
    AND is_active = TRUE
  );

-- Policy: Public can read verified inventor/conceptor profiles (for marketplace)
CREATE POLICY "Public can read verified inventors"
  ON public.profiles
  FOR SELECT
  TO anon, authenticated
  USING (
    (role = 'INVENTOR' OR role = 'CONCEPTOR')
    AND email_verified = TRUE 
    AND is_active = TRUE
  );

-- ============================================
-- 3. VERIFY RLS IS ENABLED
-- ============================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 4. GRANT NECESSARY PERMISSIONS
-- ============================================

GRANT ALL ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
GRANT SELECT ON public.profiles TO anon;

-- ============================================
-- 5. TEST QUERY (Optional - for debugging)
-- ============================================
-- Run this to see what policies are active:
-- SELECT * FROM pg_policies WHERE tablename = 'profiles';

