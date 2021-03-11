import React, { useState } from 'react';
import { Link } from '@reach/router';

import './Nav.scss';

import Logo from '../Logo';
import LoginModal from '../LoginModal';
import Hamburger from './Hamburger';

import { CONSTANTS } from '../../constants';

import { isActive } from './Nav.utils';

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const style = {
    left: isMenuOpen ? '0' : '-100%',
  };

  return (
    <div className="Nav">
      <nav className="Nav__layout container">
        <Hamburger handleHamburgerClick={handleLinkClick} />
        <Logo />
        <ul className="Nav__links" style={style}>
          {CONSTANTS.NAVIGATION.map(({ name, linkTo }) => {
            return (
              <Link
                key={name}
                className="Nav__link"
                to={linkTo}
                getProps={isActive}
                onClick={handleLinkClick}
              >
                <li>{name}</li>
              </Link>
            );
          })}
        </ul>
        <LoginModal />
      </nav>
    </div>
  );
};

export default Nav;
