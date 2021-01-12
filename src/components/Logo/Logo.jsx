import React from 'react';
import { Link } from '@reach/router';
import { connect } from 'react-redux';

import { ACTIONS } from '../../store/actions/creators';

import './Logo.scss';

import { CONSTANTS } from '../../constants';

const Logo = ({ setLoading }) => {
  const logoStyle = {
    fontWeight: 'normal',
    textDecoration: 'none',
    color: '#fff4de',
    fontSize: '10px',
  };

  const handleLogoClick = () => {
    if (window.location.pathname === '/') {
      return
    }
    setLoading(true);
  }

  return (
    <h1 className="Logo" onClick={handleLogoClick} >
      <Link to="/" style={logoStyle}>
        {CONSTANTS.LOGO}
      </Link>
    </h1>
  );
};

export default connect(null, { setLoading: ACTIONS.setLoading })(Logo);
