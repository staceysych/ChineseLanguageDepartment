import React from 'react';

import './Button.scss';

const Button = ({className, text, fn}) => {
  return (
    <button className={`${className} button`} onClick={fn}>
      {text}
    </button>
  );
};

export default Button;
