
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Profile } from './types';

export const fetchProfile = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
      return null;
    }

    return data as Profile;
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
};

export const signInWithEmail = async (email: string, password: string) => {
  console.log('Signing in with:', email);
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  
  if (error) {
    toast.error(error.message);
    console.error('Sign in error:', error);
    throw error;
  }
  
  toast.success('Signed in successfully!');
  return data;
};

export const signUpWithEmail = async (email: string, password: string, fullName: string) => {
  console.log('Signing up with:', email, fullName);
  const { data, error } = await supabase.auth.signUp({ 
    email, 
    password,
    options: {
      data: {
        full_name: fullName,
      }
    }
  });
  
  if (error) {
    toast.error(error.message);
    console.error('Sign up error:', error);
    throw error;
  }
  
  toast.success('Signed up successfully! Please check your email for verification.');
  return data;
};

export const signOutUser = async () => {
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    toast.error(error.message);
    throw error;
  }
  
  toast.success('Signed out successfully');
};

export const updateUserProfile = async (userId: string, data: Partial<Profile>) => {
  const { error } = await supabase
    .from('profiles')
    .update(data)
    .eq('id', userId);
  
  if (error) {
    toast.error(error.message);
    throw error;
  }
  
  toast.success('Profile updated successfully');
  return await fetchProfile(userId);
};
