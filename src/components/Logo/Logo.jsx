import React from 'react';
import { Link } from '@reach/router';

import './Logo.scss';

import { CONSTANTS } from '../../constants';

const Logo = () => {
  const logoStyle = {
    fontWeight: 'normal',
    textDecoration: 'none',
    color: '#fff4de',
    fontSize: '10px',
  };
  return (
    <h1 className="Logo">
      <Link to="/" style={logoStyle}>
        {CONSTANTS.LOGO}
      </Link>
    </h1>
  );
};

export default Logo;
