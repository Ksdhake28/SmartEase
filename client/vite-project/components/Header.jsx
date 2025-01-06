// components/Header.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <a href="#">SmartEase</a>
      </div>
      <div className="header-icons">
        <FontAwesomeIcon icon={faBell} />
        <div className="account">
          <h4>Kshitij Dhake</h4>
        </div>
      </div>
    </header>
  );
}

export default Header;
