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
    setLoading(true);
  }

  return (
      <Link to="/" style={logoStyle} onClick={handleLogoClick} className="Logo">
        {CONSTANTS.LOGO}
      </Link>
  );
};

export default connect(null, { setLoading: ACTIONS.setLoading })(Logo);
