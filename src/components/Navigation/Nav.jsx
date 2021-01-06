import React, { useState } from 'react';

import './Nav.scss';

import Logo from '../Logo';
import Lang from '../Lang';
import Hamburger from './Hamburger';

import { CONSTANTS } from '../../constants';

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleHamburgerClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const style = {
    left: isMenuOpen ? '0' : '-100%',
  };

  return (
    <div className="Nav">
      <nav className="Nav__layout container">
        <Hamburger handleHamburgerClick={handleHamburgerClick} />
        <Logo />
        <ul className="Nav__links" style={style}>
          <li>{CONSTANTS.TEACHERS}</li>
          <li>{CONSTANTS.STUDY}</li>
          <li>{CONSTANTS.SCIENCE}</li>
          <li>{CONSTANTS.NEWS}</li>
          <li>{CONSTANTS.CONTACTS}</li>
          <li>{CONSTANTS.OTHER}</li>
        </ul>
        <Lang />
      </nav>
    </div>
  );
};

export default Nav;
