
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Heart, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth/useAuth';
import CartButton from './CartButton';

const DesktopActions: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div className="hidden md:flex items-center space-x-4">
      <Link to="/search">
        <Button 
          variant="ghost" 
          size="icon"
          aria-label="Search"
        >
          <Search className="h-5 w-5" />
        </Button>
      </Link>

      {user ? (
        <>
          <Link to="/wishlist">
            <Button 
              variant="ghost" 
              size="icon"
              aria-label="Wishlist"
            >
              <Heart className="h-5 w-5" />
            </Button>
          </Link>
          <Link to="/profile">
            <Button 
              variant="ghost" 
              size="icon"
              aria-label="Account"
            >
              <User className="h-5 w-5" />
            </Button>
          </Link>
        </>
      ) : (
        <Link to="/auth">
          <Button variant="outline" size="sm">
            Sign in
          </Button>
        </Link>
      )}

      <CartButton />
    </div>
  );
};

export default DesktopActions;
