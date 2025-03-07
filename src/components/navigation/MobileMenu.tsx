
import React from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth/useAuth';
import { cn } from '@/lib/utils';
import NavLinks from './NavLinks';

interface MobileMenuProps {
  isOpen: boolean;
  links: { name: string; path: string }[];
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ 
  isOpen, 
  links, 
  onClose 
}) => {
  const { user } = useAuth();
  
  if (!isOpen) return null;
  
  return (
    <div className="md:hidden bg-background fixed inset-0 pt-16 z-40 animate-fade-in">
      <div className="container p-4 flex flex-col space-y-6">
        <NavLinks
          links={links}
          className="flex flex-col"
          onClick={onClose}
        />
        
        <Link
          to={user ? "/profile" : "/auth"}
          className="py-2 text-xl font-medium border-b border-border"
          onClick={onClose}
        >
          {user ? 'My Account' : 'Sign In'}
        </Link>
        
        <div className="pt-4 flex items-center justify-center">
          <Button 
            variant="outline" 
            size="lg" 
            className="w-full"
            onClick={onClose}
          >
            <Search className="mr-2 h-5 w-5" />
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
