
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ShoppingCart, 
  User, 
  Menu, 
  X, 
  Search,
  Heart 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { itemCount } = useCart();
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  // Change navbar style on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Books', path: '/products?category=book' },
    { name: 'Posters', path: '/products?category=poster' },
    { name: 'Custom Orders', path: '/custom-order' },
  ];

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out-expo',
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-subtle py-2' : 'bg-transparent py-4'
      )}
    >
      <nav className="container-tight flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-display text-2xl font-bold transition-opacity hover:opacity-80">
          StoryMaker
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'font-medium transition-colors hover:text-primary',
                location.pathname === link.path ? 'text-primary' : 'text-foreground'
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Action Items */}
        <div className="hidden md:flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </Button>

          {isAuthenticated ? (
            <>
              <Link to="/account/wishlist">
                <Button 
                  variant="ghost" 
                  size="icon"
                  aria-label="Wishlist"
                >
                  <Heart className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/account">
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
            <Link to="/account/login">
              <Button variant="outline" size="sm">
                Sign in
              </Button>
            </Link>
          )}

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
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-3">
          <Link to="/cart" className="relative">
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                {itemCount > 9 ? '9+' : itemCount}
              </span>
            )}
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-foreground p-1"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background fixed inset-0 pt-16 z-40 animate-fade-in">
          <div className="container p-4 flex flex-col space-y-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'py-2 text-xl font-medium border-b border-border transition-colors',
                  location.pathname === link.path ? 'text-primary' : 'text-foreground'
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            
            <Link
              to="/account"
              className="py-2 text-xl font-medium border-b border-border"
              onClick={() => setMobileMenuOpen(false)}
            >
              {isAuthenticated ? 'My Account' : 'Sign In'}
            </Link>
            
            <div className="pt-4 flex items-center justify-center">
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full"
                onClick={() => {
                  setMobileMenuOpen(false);
                  // Open search functionality
                }}
              >
                <Search className="mr-2 h-5 w-5" />
                Search
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
