import React, { useState } from 'react';
import { Link } from '@reach/router';

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

  const linkStyle = {
    fontWeight: 'normal',
    textDecoration: 'none',
    color: '#fff4de',
  };
  const linkStyleActive = {
    fontWeight: 'normal',
    textDecoration: 'none',
    color: 'black',
  };

  const isActive = ({ isCurrent }) => {
    return isCurrent ? { style: linkStyleActive } : { style: linkStyle }
  }

  return (
    <div className="Nav">
      <nav className="Nav__layout container">
        <Hamburger handleHamburgerClick={handleHamburgerClick} />
        <Logo />
        <ul className="Nav__links" style={style}>
          <Link className="Nav__link" to="teachers" getProps={isActive}>
            <li>{CONSTANTS.TEACHERS}</li>
          </Link>
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
