
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/auth/useAuth';
import { isCurrentUserAdmin } from '@/utils/auth';

interface NavLinksProps {
  links: { name: string; path: string }[];
  className?: string;
  onClick?: () => void;
}

const NavLinks: React.FC<NavLinksProps> = ({ 
  links, 
  className, 
  onClick 
}) => {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    const checkAdmin = async () => {
      if (user) {
        const adminStatus = await isCurrentUserAdmin();
        setIsAdmin(adminStatus);
      } else {
        setIsAdmin(false);
      }
    };
    
    checkAdmin();
  }, [user]);
  
  // Combine standard links with admin link if user is admin
  const allLinks = isAdmin
    ? [...links, { name: 'Admin', path: '/admin' }]
    : links;
  
  return (
    <nav className={className}>
      {allLinks.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          className={({ isActive }) =>
            cn(
              'block py-2 px-2 transition-colors hover:text-primary',
              isActive ? 'font-medium text-primary' : 'text-muted-foreground',
            )
          }
          onClick={onClick}
        >
          {link.name}
        </NavLink>
      ))}
    </nav>
  );
};

export default NavLinks;
