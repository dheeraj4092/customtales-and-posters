
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import NavLinks from './navigation/NavLinks';
import DesktopActions from './navigation/DesktopActions';
import MobileActions from './navigation/MobileActions';
import MobileMenu from './navigation/MobileMenu';
import { ThemeToggle } from './ThemeToggle';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    { name: 'Books', path: '/books' },
    { name: 'Posters', path: '/posters' },
    { name: 'Custom Orders', path: '/custom-order' },
  ];

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out-expo',
        isScrolled 
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-subtle py-2' 
          : 'bg-transparent py-4'
      )}
    >
      <nav className="container-tight flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-display text-2xl font-bold transition-opacity hover:opacity-80">
          StoryMaker
        </Link>

        {/* Desktop Navigation */}
        <NavLinks 
          links={navLinks} 
          className="hidden md:flex items-center space-x-8" 
        />

        {/* Desktop Action Items with Theme Toggle */}
        <div className="hidden md:flex items-center space-x-2">
          <ThemeToggle />
          <DesktopActions />
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center space-x-2">
          <ThemeToggle />
          <MobileActions 
            mobileMenuOpen={mobileMenuOpen} 
            toggleMobileMenu={toggleMobileMenu} 
          />
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={mobileMenuOpen} 
        links={navLinks} 
        onClose={() => setMobileMenuOpen(false)} 
      />
    </header>
  );
};

export default Navbar;
