
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth/useAuth';
import { Navigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm';
import AuthLoadingSkeleton from '@/components/auth/AuthLoadingSkeleton';
import { toast } from 'sonner';

const Auth: React.FC = () => {
  const { user, isLoading, signIn, signUp } = useAuth();
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [authChecked, setAuthChecked] = useState(false);

  // Set a timeout to ensure we don't get stuck in an infinite loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setAuthChecked(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Add debug logs to track authentication state
  useEffect(() => {
    console.log('Auth page state:', { user, isLoading, authChecked });
  }, [user, isLoading, authChecked]);

  // If user is logged in, redirect to home
  if (!isLoading && user) {
    console.log('User authenticated, redirecting to home');
    return <Navigate to="/" replace />;
  }

  // Show loading skeleton while authentication state is being determined
  // Only show for a short period before considering auth checked
  if (isLoading && !authChecked) {
    return <AuthLoadingSkeleton />;
  }

  const handleLogin = async (email: string, password: string) => {
    try {
      console.log('Attempting login with:', email);
      await signIn(email, password);
      toast.success('Signed in successfully!');
    } catch (error) {
      console.error('Sign in error:', error);
      toast.error('Failed to sign in. Please check your credentials.');
    }
  };

  const handleSignup = async (email: string, password: string, fullName: string) => {
    try {
      console.log('Attempting signup with:', email, fullName);
      await signUp(email, password, fullName);
      toast.success('Account created successfully! Please check your email for verification.');
      // Switch to login tab after successful signup
      setActiveTab('login');
    } catch (error) {
      console.error('Sign up error:', error);
      toast.error('Failed to create account. Please try again.');
    }
  };

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-200px)] py-12">
      <Tabs 
        defaultValue={activeTab} 
        value={activeTab} 
        onValueChange={(value) => setActiveTab(value as 'login' | 'signup')}
        className="w-full max-w-md"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        
        <TabsContent value="login">
          <LoginForm onSubmit={handleLogin} />
        </TabsContent>
        
        <TabsContent value="signup">
          <SignupForm onSubmit={handleSignup} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Auth;
