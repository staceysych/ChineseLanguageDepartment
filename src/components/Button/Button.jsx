import React from 'react';

import './Button.scss';

const Button = ({text, fn}) => {
  return (
    <button className="button" onClick={fn}>
      {text}
    </button>
  );
};

export default Button;
