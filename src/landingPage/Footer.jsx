import React from 'react';
import logo from '../assets/images/logo.svg'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="py-6">
      <div className="container mx-auto flex justify-between">
        <img src={logo} alt="Logo" className="w-28" />
        <div className="flex space-x-6 ">
          <Link to="#" className="hover:underline">Features</Link>
          <Link to="#" className="hover:underline">Testimonials</Link>
          <Link to="#" className="hover:underline">Download</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
