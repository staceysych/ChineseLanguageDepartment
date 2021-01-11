import React from 'react';
import { Link } from '@reach/router';
import { connect } from 'react-redux';

import { ACTIONS } from '../../store/actions/creators';

import './Logo.scss';

import { CONSTANTS } from '../../constants';

const Logo = ({ setLoading }) => {
  const get = async () => {
    await fetch('http://localhost:4000/users/', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }

    }).then(res => res.json()).then(data => console.log(data))
  }
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
    <h1 className="Logo" onClick={handleLogoClick} >
      <Link to="/" style={logoStyle} onClick={() => get()}>
        {CONSTANTS.LOGO}
      </Link>
    </h1>
  );
};

export default connect(null, { setLoading: ACTIONS.setLoading })(Logo);
