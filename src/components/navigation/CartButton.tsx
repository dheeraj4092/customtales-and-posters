
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

interface CartButtonProps {
  isMobile?: boolean;
}

const CartButton: React.FC<CartButtonProps> = ({ isMobile = false }) => {
  const { itemCount } = useCart();
  
  if (isMobile) {
    return (
      <Link to="/cart" className="relative">
        <ShoppingCart className="h-5 w-5" />
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
            {itemCount > 9 ? '9+' : itemCount}
          </span>
        )}
      </Link>
    );
  }
  
  return (
    <Link to="/cart">
      <Button 
        variant="ghost" 
        size="icon"
        aria-label="Cart"
        className="relative"
      >
        <ShoppingCart className="h-5 w-5" />
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
            {itemCount > 9 ? '9+' : itemCount}
          </span>
        )}
      </Button>
    </Link>
  );
};

export default CartButton;
