
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface NavLink {
  name: string;
  path: string;
}

interface NavLinksProps {
  links: NavLink[];
  className?: string;
  onClick?: () => void;
}

const NavLinks: React.FC<NavLinksProps> = ({ 
  links, 
  className = '', 
  onClick 
}) => {
  const location = useLocation();
  
  return (
    <div className={className}>
      {links.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className={cn(
            'font-medium transition-colors hover:text-primary',
            location.pathname === link.path ? 'text-primary' : 'text-foreground'
          )}
          onClick={onClick}
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;
