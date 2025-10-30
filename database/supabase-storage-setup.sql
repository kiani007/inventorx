-- ============================================
-- SUPABASE STORAGE BUCKETS & POLICIES
-- ============================================
-- Execute this in Supabase SQL Editor after creating buckets in UI

-- ============================================
-- 1. CREATE STORAGE BUCKETS (Do this in UI first)
-- ============================================
-- Navigate to Storage in Supabase Dashboard and create:
-- 1. Bucket name: "profile-photos" (Public)
-- 2. Bucket name: "company-logos" (Public)

-- ============================================
-- 2. PROFILE PHOTOS BUCKET POLICIES
-- ============================================

-- Allow authenticated users to upload their own profile photo
CREATE POLICY "Users can upload own profile photo"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'profile-photos' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow users to update their own profile photo
CREATE POLICY "Users can update own profile photo"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'profile-photos' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow users to delete their own profile photo
CREATE POLICY "Users can delete own profile photo"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'profile-photos' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow public read access to all profile photos
CREATE POLICY "Public can view profile photos"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'profile-photos');

-- ============================================
-- 3. COMPANY LOGOS BUCKET POLICIES
-- ============================================

-- Allow authenticated users to upload company logos
CREATE POLICY "Users can upload company logos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'company-logos' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow users to update their company logos
CREATE POLICY "Users can update company logos"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'company-logos' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow users to delete their company logos
CREATE POLICY "Users can delete company logos"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'company-logos' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow public read access to all company logos
CREATE POLICY "Public can view company logos"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'company-logos');

-- ============================================
-- USAGE NOTES:
-- ============================================
-- File path structure:
-- - profile-photos/{user_id}/avatar.jpg
-- - company-logos/{user_id}/logo-1.png
-- - company-logos/{user_id}/logo-2.png
-- - company-logos/{user_id}/logo-3.png
--
-- Max 3 company logos per user (enforce in application logic)
-- ============================================

