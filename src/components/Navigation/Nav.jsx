import React, { useState } from 'react';
import { Link } from '@reach/router';

import './Nav.scss';

import Logo from '../Logo';
import Lang from '../Lang';
import Hamburger from './Hamburger';

import { CONSTANTS } from '../../constants';

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLinkClick = () => {
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

  const isActive = ({ isPartiallyCurrent }) => {
    return isPartiallyCurrent
      ? { style: linkStyle, className: 'Nav__link Nav__link_active' }
      : { style: linkStyle };
  };

  return (
    <div className="Nav">
      <nav className="Nav__layout container">
        <Hamburger handleHamburgerClick={handleLinkClick} />
        <Logo />
        <ul className="Nav__links" style={style}>
          {CONSTANTS.NAVIGATION.map(({ name, linkTo }) => {
            return (
              <Link key={name} className="Nav__link" to={linkTo} getProps={isActive} onClick={handleLinkClick}>
                <li>{name}</li>
              </Link>
            );
          })}
        </ul>
        <Lang />
      </nav>
    </div>
  );
};

export default Nav;
