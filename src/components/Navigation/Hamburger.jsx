import React from 'react';

import './Hamburger.scss';

const Hamburger = ({handleHamburgerClick}) => {
  return (
    <div className="Hamburger" onClick={handleHamburgerClick}>
      <div className="Hamburger__line" />
      <div className="Hamburger__line" />
      <div className="Hamburger__line" />
    </div>
  );
}

export default Hamburger;
