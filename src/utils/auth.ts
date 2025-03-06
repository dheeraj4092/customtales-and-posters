
import { supabase } from '@/integrations/supabase/client';

// For client-side admin check based on user session
export const is_admin = async (userId: string): Promise<boolean> => {
  if (!userId) return false;
  
  try {
    const { data, error } = await supabase
      .rpc('is_admin', { user_id: userId });
      
    if (error) {
      console.error('Error checking admin status:', error);
      return false;
    }
    
    return data === true;
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
};

// Check if the current user is an admin
export const isCurrentUserAdmin = async (): Promise<boolean> => {
  const { data } = await supabase.auth.getSession();
  if (!data.session?.user?.id) return false;
  
  return is_admin(data.session.user.id);
};
