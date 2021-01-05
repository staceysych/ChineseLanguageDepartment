import React from 'react';

import './Logo.scss';

import { CONSTANTS } from '../../constants';

const Logo = () => {
  return (
    <h1 className="Logo">
      {CONSTANTS.LOGO}
    </h1>
  );
}

export default Logo;
