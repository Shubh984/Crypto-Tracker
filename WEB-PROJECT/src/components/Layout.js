import React from 'react';
import Header from './Header';

const Layout = ({ children }) => (
  <div>
    <Header />
    <main>{children}</main>
  </div>
);

export default Layout;