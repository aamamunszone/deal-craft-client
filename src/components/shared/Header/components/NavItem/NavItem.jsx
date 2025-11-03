import React from 'react';
import { NavLink } from 'react-router';

const NavItem = ({ to, children, className = '' }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `px-3 py-1.5 rounded-md font-medium transition-all duration-200 ease-in-out flex justify-center items-center gap-1 ${
            isActive
              ? 'bg-linear-to-br from-[#fc00ff] to-[#00dbde] text-white'
              : 'bg-gray-100 hover:bg-gray-200'
          } ${className}`
        }
      >
        {children}
      </NavLink>
    </li>
  );
};

export default NavItem;
