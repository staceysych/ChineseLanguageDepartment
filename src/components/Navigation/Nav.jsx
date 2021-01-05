import React from 'react';

import './Nav.scss';

import Logo from '../Logo';
import Lang from '../Lang';

import { CONSTANTS } from '../../constants';

const Nav = () => {
  return (
    <nav className="Nav">
      <Logo />
      <ul className="Nav__links">
        <li>{CONSTANTS.TEACHERS}</li>
        <li>{CONSTANTS.STUDY}</li>
        <li>{CONSTANTS.SCIENCE}</li>
        <li>{CONSTANTS.NEWS}</li>
        <li>{CONSTANTS.CONTACTS}</li>
        <li>{CONSTANTS.OTHER}</li>
      </ul>
      <Lang />
    </nav>
  );
}

export default Nav;
