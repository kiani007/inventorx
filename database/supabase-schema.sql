-- ============================================
-- INVENTORX DATABASE SCHEMA FOR SUPABASE
-- ============================================
-- This schema supports 3 user roles: INVENTOR, CONCEPTOR, INVESTOR
-- Execute this SQL in your Supabase SQL Editor

-- ============================================
-- 1. CREATE ENUM TYPES
-- ============================================

CREATE TYPE user_role AS ENUM ('INVENTOR', 'CONCEPTOR', 'INVESTOR');

-- ============================================
-- 2. CREATE PROFILES TABLE
-- ============================================
-- This extends auth.users with additional profile information
-- auth.users is managed by Supabase Auth automatically

CREATE TABLE public.profiles (
  -- Primary Key (matches auth.users.id)
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Common fields for all roles
  role user_role NOT NULL,
  full_name TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  phone_verified BOOLEAN DEFAULT FALSE,
  country TEXT NOT NULL,
  
  -- Optional for Inventor/Conceptor, Optional for Investor
  city TEXT,
  short_description TEXT,
  
  -- Investor-specific fields (NULL for Inventor/Conceptor)
  profile_photo_url TEXT,
  company_names TEXT[], -- Array of company names
  company_logo_urls TEXT[], -- Array of up to 3 logo URLs (paid feature)
  company_websites TEXT[], -- Array of HTTPS website URLs
  
  -- Verification & Status
  email_verified BOOLEAN DEFAULT FALSE,
  profile_completed BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 3. CREATE INDEXES FOR PERFORMANCE
-- ============================================

CREATE INDEX idx_profiles_role ON public.profiles(role);
CREATE INDEX idx_profiles_country ON public.profiles(country);
CREATE INDEX idx_profiles_created_at ON public.profiles(created_at DESC);
CREATE INDEX idx_profiles_email_verified ON public.profiles(email_verified);

-- ============================================
-- 4. CREATE UPDATED_AT TRIGGER
-- ============================================
-- Automatically update the updated_at timestamp

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 5. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own profile
CREATE POLICY "Users can read own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Policy: Authenticated users can insert their own profile (FIXED)
-- Allow authenticated users to insert a profile with their own user ID
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
-- 6. VALIDATION CONSTRAINTS
-- ============================================

-- Ensure phone number is not empty
ALTER TABLE public.profiles 
  ADD CONSTRAINT phone_number_not_empty 
  CHECK (length(trim(phone_number)) > 0);

-- Ensure full name is not empty
ALTER TABLE public.profiles 
  ADD CONSTRAINT full_name_not_empty 
  CHECK (length(trim(full_name)) > 0);

-- Ensure country is not empty
ALTER TABLE public.profiles 
  ADD CONSTRAINT country_not_empty 
  CHECK (length(trim(country)) > 0);

-- ============================================
-- 7. HELPER FUNCTIONS (OPTIONAL)
-- ============================================

-- Function to check if user profile is complete
CREATE OR REPLACE FUNCTION public.is_profile_complete(user_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  profile_record RECORD;
BEGIN
  SELECT * INTO profile_record FROM public.profiles WHERE id = user_id;
  
  IF profile_record.role = 'INVESTOR' THEN
    -- Investor must have profile photo
    RETURN profile_record.profile_photo_url IS NOT NULL 
      AND profile_record.email_verified = TRUE;
  ELSE
    -- Inventor/Conceptor just need basic fields
    RETURN profile_record.email_verified = TRUE;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- 8. GRANT PERMISSIONS
-- ============================================

-- Grant access to authenticated users
GRANT ALL ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;

-- Grant read access to anonymous users (for public directory)
GRANT SELECT ON public.profiles TO anon;

-- ============================================
-- NOTES FOR DEVELOPER:
-- ============================================
-- 1. Configure OAuth providers in Supabase Dashboard:
--    Settings > Authentication > Providers
--    - Enable Google OAuth
--    - Enable LinkedIn OAuth
--    - Set redirect URLs
--
-- 2. Configure email templates:
--    Settings > Authentication > Email Templates
--    - Customize signup confirmation email
--    - Customize magic link email
--
-- 3. Set up Storage bucket for profile photos:
--    Storage > Create new bucket "profile-photos"
--    - Set as public
--    - Add RLS policies for upload/read
--
-- 4. Set up Storage bucket for company logos:
--    Storage > Create new bucket "company-logos"
--    - Set as public
--    - Add RLS policies for upload/read
-- ============================================

