import React from 'react';
import Container from '../../common/Container/Container';
import NavItem from './components/NavItem/NavItem';
import { Link } from 'react-router';

const Header = () => {
  const navLinks = (
    <>
      <NavItem to="/home">Home</NavItem>
      <NavItem to="/about">About</NavItem>
      <NavItem to="/all-products">All Products</NavItem>
      <NavItem to="/services">Services</NavItem>
      <NavItem to="/contact">Contact</NavItem>
    </>
  );

  return (
    <div className="z-50">
      <Container className="navbar">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="lg:hidden mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {' '}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{' '}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-200 rounded-box z-10 mt-4 w-52 p-2 shadow gap-1"
            >
              {navLinks}
            </ul>
          </div>
          <Link
            to="/"
            className="text-2xl md:text-[26px] lg:text-3xl font-bold tracking-wider leading-relaxed"
          >
            DealCraft
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-5">{navLinks}</ul>
        </div>
        <div className="navbar-end">
          <Link
            to="/auth"
            className="px-3 py-1.5 rounded-md font-medium bg-linear-to-br from-[#ee0979] to-[#ff6a00] text-white transition-all duration-200 ease-in-out"
          >
            Login
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default Header;
