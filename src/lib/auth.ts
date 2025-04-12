import { supabase } from './supabase';

// Check if a user is authenticated
export const isAuthenticated = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.error('Error checking authentication:', error);
    return false;
  }
  return !!data.session;
};

// Check if a user has admin rights
export const isAdmin = async () => {
  const { data: userData, error: authError } = await supabase.auth.getUser();
  
  if (authError || !userData.user) {
    console.error('Error checking user:', authError);
    return false;
  }
  
  // Check if the user has admin privileges in app_metadata
  return userData.user.app_metadata?.admin === true;
};

// Sign in with email and password
export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) {
    throw error;
  }
  
  return data;
};

// Sign out
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw error;
  }
  return true;
}; 