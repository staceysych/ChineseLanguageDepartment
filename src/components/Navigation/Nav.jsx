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

  const isActive = ({ isPartiallyCurrent  }) => {
    return isPartiallyCurrent
      ? { style: linkStyle, className: 'Nav__link Nav__link_active' }
      : { style: linkStyle };
  };

  return (
    <div className="Nav">
      <nav className="Nav__layout container">
        <Hamburger handleHamburgerClick={handleHamburgerClick} />
        <Logo />
        <ul className="Nav__links" style={style}>
          <Link className="Nav__link" to="teachers" getProps={isActive}>
            <li>{CONSTANTS.TEACHERS}</li>
          </Link>
          <Link className="Nav__link" to="study" getProps={isActive}>
            <li>{CONSTANTS.STUDY}</li>
          </Link>
          <Link className="Nav__link" to="science" getProps={isActive}>
            <li>{CONSTANTS.SCIENCE}</li>
          </Link>
          <Link className="Nav__link" to="news" getProps={isActive}>
            <li>{CONSTANTS.NEWS}</li>
          </Link>
          <Link className="Nav__link" to="contacts" getProps={isActive}>
            <li>{CONSTANTS.CONTACTS}</li>
          </Link>
          <Link className="Nav__link" to="other" getProps={isActive}>
            <li>{CONSTANTS.OTHER}</li>
          </Link>
        </ul>
        <Lang />
      </nav>
    </div>
  );
};

export default Nav;
