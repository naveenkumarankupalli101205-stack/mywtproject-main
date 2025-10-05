-- Migration: Add function for users to delete their own account
-- This function allows authenticated users to delete their own account and all associated data

CREATE OR REPLACE FUNCTION public.delete_user_account()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  user_id UUID;
BEGIN
  -- Get the current user's ID
  user_id := auth.uid();
  
  -- Check if user is authenticated
  IF user_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;
  
  -- Delete from auth.users (this will cascade to user_profiles and all related tables)
  DELETE FROM auth.users WHERE id = user_id;
  
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.delete_user_account() TO authenticated;

-- Add comment
COMMENT ON FUNCTION public.delete_user_account() IS 
'Allows authenticated users to delete their own account and all associated data. This is irreversible.';
