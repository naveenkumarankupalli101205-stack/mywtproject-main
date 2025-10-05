
import { supabase } from '../lib/supabase';

/**
 * Get the current user session.
 * @returns {Promise<object|null>} The user session object or null if not authenticated.
 */
export const getSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.error('Error getting session:', error);
    return null;
  }
  return data.session;
};

/**
 * Get the profile for a user.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<object|null>} The user profile data or null if not found.
 */
export const getUserProfile = async (userId) => {
  if (!userId) return null;

  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }

  return data;
};

/**
 * Update the profile for a user.
 * @param {string} userId - The ID of the user.
 * @param {object} updates - An object with the fields to update.
 * @returns {Promise<object|null>} The updated user profile data or null on error.
 */
export const updateUserProfile = async (userId, updates) => {
  if (!userId) return null;

  const { data, error } = await supabase
    .from('user_profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();

  if (error) {
    console.error('Error updating user profile:', error.message);
    throw error;
  }

  return data;
};

/**
 * Get emergency contacts for a user.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<Array|null>} An array of emergency contacts or null on error.
 */
export const getEmergencyContacts = async (userId) => {
  if (!userId) return null;

  const { data, error } = await supabase
    .from('emergency_contacts')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching emergency contacts:', error);
    return [];
  }

  return data;
};

/**
 * Save emergency contacts for a user.
 * @param {string} userId - The ID of the user.
 * @param {Array} contacts - An array of emergency contact objects.
 * @returns {Promise<Array|null>} The saved emergency contacts or null on error.
 */
export const saveEmergencyContacts = async (userId, contacts) => {
  if (!userId || !contacts) return null;

  // 1. Remove existing contacts for this user
  const { error: deleteError } = await supabase
    .from('emergency_contacts')
    .delete()
    .eq('user_id', userId);

  if (deleteError) {
    console.error('Error deleting existing contacts:', deleteError);
    throw deleteError;
  }

  // 2. Insert the new contacts
  const contactsWithUserId = contacts.map(c => ({ ...c, user_id: userId }));
  
  const { data, error: insertError } = await supabase
    .from('emergency_contacts')
    .insert(contactsWithUserId)
    .select();

  if (insertError) {
    console.error('Error inserting new contacts:', insertError);
    throw insertError;
  }

  return data;
};

/**
 * Delete user account and all associated data.
 * This will delete the user's authentication account and all associated data.
 * All related data (user profile, emergency contacts, alerts, responses) will be automatically deleted due to CASCADE constraints.
 * @returns {Promise<{success: boolean, error: object|null}>}
 */
export const deleteUserAccount = async () => {
  try {
    // Call the database function to delete the user account
    const { error: deleteError } = await supabase.rpc('delete_user_account');

    if (deleteError) {
      console.error('Error deleting user account:', deleteError);
      throw deleteError;
    }

    // Sign out after deletion
    await supabase.auth.signOut();

    return { success: true, error: null };
  } catch (error) {
    console.error('Error in deleteUserAccount:', error);
    return { success: false, error };
  }
};
