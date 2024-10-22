import React, { useState } from "react";
import logo from "../assets/images/logo.svg";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; // For hamburger and close icons

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="py-3 shadow-md">
      <div className="container mx-auto  px-4 md:px-10 lg:px-20">
        {/* Logo */}
        <div className="md:hidden text-2xl flex justify-between items-center cursor-pointer" onClick={toggleMenu}>
          <RouterLink to="/">
            <img src={logo} alt="Logo" className="w-32 md:w-38" />
          </RouterLink>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Hamburger icon for mobile */}

        {/* Menu Links */}
        <div
          className={`${isOpen
            ? "block"
            : "hidden"} md:flex space-x-6 text-lg cursor-pointer justify-between items-center md:space-x-8 md:static absolute top-16 left-0 w-full bg-white md:bg-transparent md:py-0 py-4 md:px-0 px-4 shadow-lg md:shadow-none`}
        >
          <RouterLink to="/">
            <img src={logo} alt="Logo" className="w-32 md:w-38" />
          </RouterLink>
          {/* Smooth scrolling links */}
          <div className="flex space-x-4 items-center">
            <ScrollLink
              className="block py-2 md:py-0"
              to="home"
              smooth={true}
              duration={500}
              onClick={() => setIsOpen(false)}
            >
              Home
            </ScrollLink>
            <ScrollLink
              className="block py-2 md:py-0 text-gray-800"
              to="features"
              smooth={true}
              duration={500}
              onClick={() => setIsOpen(false)}
            >
              Features
            </ScrollLink>
            <ScrollLink
              className="block py-2 md:py-0 text-gray-800"
              to="testimonials"
              smooth={true}
              duration={500}
              onClick={() => setIsOpen(false)}
            >
              Testimonials
            </ScrollLink>
            <ScrollLink
              className="block py-2 md:py-0 text-gray-800"
              to="download"
              smooth={true}
              duration={500}
              onClick={() => setIsOpen(false)}
            >
              Download
            </ScrollLink>

            <RouterLink
              className="block py-2 md:py-0 text-gray-800"
              to="/user/contactUs"
              onClick={() => setIsOpen(false)}
            >
              Contact Us
            </RouterLink>

            {/* React Router links for signup and login */}
            <RouterLink
              className="block py-2 md:py-0 text-gray-800"
              to="/user/signup"
              onClick={() => setIsOpen(false)}
            >
              Sign up
            </RouterLink>

            <RouterLink
              to="/user/login"
              className="block px-4 py-2 md:py-1 bg-gradient-to-l from-blue-500 to-teal-400 hover:bg-gradient-to-r hover:from-blue-500 hover:to-teal-400 text-white rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Log In
            </RouterLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
