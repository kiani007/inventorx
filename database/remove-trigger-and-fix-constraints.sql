-- ============================================
-- REMOVE AUTO-PROFILE-CREATION TRIGGER
-- ============================================
-- This migration removes the trigger that was interfering with 
-- application-managed profile creation.
--
-- The application needs to:
-- 1. Create auth user
-- 2. Upload files (requires user ID)
-- 3. Create profile with file URLs
--
-- The trigger was trying to create profiles without required data,
-- causing "country_not_empty" constraint violations.
-- ============================================

-- Drop the trigger first
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Drop the function
DROP FUNCTION IF EXISTS public.handle_new_user();

-- ============================================
-- ENSURE CHECK CONSTRAINTS EXIST
-- ============================================
-- These constraints ensure data quality

-- Check: full_name cannot be empty or just whitespace
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'full_name_not_empty'
  ) THEN
    ALTER TABLE public.profiles 
    ADD CONSTRAINT full_name_not_empty 
    CHECK (LENGTH(TRIM(full_name)) > 0);
  END IF;
END $$;

-- Check: phone_number cannot be empty or just whitespace
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'phone_number_not_empty'
  ) THEN
    ALTER TABLE public.profiles 
    ADD CONSTRAINT phone_number_not_empty 
    CHECK (LENGTH(TRIM(phone_number)) > 0);
  END IF;
END $$;

-- Check: country cannot be empty or just whitespace
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'country_not_empty'
  ) THEN
    ALTER TABLE public.profiles 
    ADD CONSTRAINT country_not_empty 
    CHECK (LENGTH(TRIM(country)) > 0);
  END IF;
END $$;

-- Check: company_websites must be HTTPS (if provided)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'company_websites_https'
  ) THEN
    ALTER TABLE public.profiles 
    ADD CONSTRAINT company_websites_https 
    CHECK (
      company_websites IS NULL OR 
      (SELECT bool_and(url ~* '^https://.*') 
       FROM unnest(company_websites) AS url)
    );
  END IF;
END $$;

-- Check: maximum 3 company logos
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'max_3_company_logos'
  ) THEN
    ALTER TABLE public.profiles 
    ADD CONSTRAINT max_3_company_logos 
    CHECK (
      company_logo_urls IS NULL OR 
      array_length(company_logo_urls, 1) <= 3
    );
  END IF;
END $$;

-- ============================================
-- VERIFICATION
-- ============================================
-- Verify the trigger is removed

DO $$
DECLARE
  trigger_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO trigger_count
  FROM information_schema.triggers
  WHERE trigger_name = 'on_auth_user_created'
  AND trigger_schema = 'auth';
  
  IF trigger_count > 0 THEN
    RAISE EXCEPTION 'Trigger still exists! Migration failed.';
  ELSE
    RAISE NOTICE '✅ Trigger successfully removed';
  END IF;
END $$;

-- Verify the function is removed
DO $$
DECLARE
  function_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO function_count
  FROM pg_proc
  JOIN pg_namespace ON pg_proc.pronamespace = pg_namespace.oid
  WHERE pg_proc.proname = 'handle_new_user'
  AND pg_namespace.nspname = 'public';
  
  IF function_count > 0 THEN
    RAISE EXCEPTION 'Function still exists! Migration failed.';
  ELSE
    RAISE NOTICE '✅ Function successfully removed';
  END IF;
END $$;

RAISE NOTICE '✅ Migration completed successfully';
RAISE NOTICE '🎯 Application can now manage profile creation properly';

