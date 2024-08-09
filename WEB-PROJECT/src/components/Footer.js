import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white p-4 mt-4">
      <div className="container mx-auto text-center">
        &copy; {new Date().getFullYear()} CryptoApp. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
