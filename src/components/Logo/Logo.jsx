import React from 'react';
import { Link } from '@reach/router';
import { connect } from 'react-redux';

import { ACTIONS } from '../../store/actions/creators';

import './Logo.scss';

import { CONSTANTS } from '../../constants';
import { logoStyle } from './utils';

const Logo = ({ setLoading }) => {
  const handleLogoClick = () => {
    if (window.location.pathname === '/') {
      return;
    }
    setLoading(true);
  };

  return (
    <Link to="/" style={logoStyle} onClick={handleLogoClick} className="Logo">
      {CONSTANTS.LOGO}
    </Link>
  );
};

export default connect(null, { setLoading: ACTIONS.setLoading })(Logo);
