import React from 'react';
import Link from 'next/link';

const Header = () => (
  <header className="navbar">
    <nav>
      <ul className="nav-list">
        <li>
          <Link href="/" legacyBehavior>
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/search" legacyBehavior>
            <a>Search</a>
          </Link>
        </li>
        <li>
          <Link href="/dashboard" legacyBehavior>
            <a>Dashboard</a>
          </Link>
        </li>
        <li>
          <Link href="/login" legacyBehavior>
            <a>Login</a>
          </Link>
        </li>
        <li>
          <Link href="/register" legacyBehavior>
            <a>Register</a>
          </Link>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;