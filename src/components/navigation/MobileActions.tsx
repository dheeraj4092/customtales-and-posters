
import React from 'react';
import { Menu, X } from 'lucide-react';
import CartButton from './CartButton';

interface MobileActionsProps {
  mobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}

const MobileActions: React.FC<MobileActionsProps> = ({ 
  mobileMenuOpen, 
  toggleMobileMenu 
}) => {
  return (
    <div className="md:hidden flex items-center space-x-3">
      <CartButton isMobile />
      <button
        onClick={toggleMobileMenu}
        className="text-foreground p-1"
        aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
      >
        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>
    </div>
  );
};

export default MobileActions;
