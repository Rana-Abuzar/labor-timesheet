-- ============================================================
-- MIGRATION: Run this in Supabase → SQL Editor → New query
-- ============================================================

-- 1. Remove FK constraint on timesheets.laborer_id
--    This allows machine UUIDs to be stored (vehicle/equipment timesheets)
ALTER TABLE public.timesheets DROP CONSTRAINT IF EXISTS timesheets_laborer_id_fkey;

-- 2. Add phone fields to vendors
ALTER TABLE public.vendors ADD COLUMN IF NOT EXISTS contact_person_phone text NOT NULL DEFAULT '';
ALTER TABLE public.vendors ADD COLUMN IF NOT EXISTS company_phone text NOT NULL DEFAULT '';

-- 3. Add category to machines to distinguish vehicles from equipment
ALTER TABLE public.machines ADD COLUMN IF NOT EXISTS category text NOT NULL DEFAULT 'vehicle';
