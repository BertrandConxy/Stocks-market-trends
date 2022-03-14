import React from 'react';
import { FaSearch, FaMicrophone } from 'react-icons/fa';
import { IoMdSettings } from 'react-icons/io';
import './header.css';

const Header = () => (
  <header>
    <div className="brand-container">
      <h1>Stock market trends</h1>
    </div>
    <div className="icons-container">
      <FaSearch />
      <FaMicrophone />
      <IoMdSettings />
    </div>
  </header>
);

export default Header;
