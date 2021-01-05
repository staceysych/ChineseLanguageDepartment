import React from 'react';

const Button = ({text, fn}) => {
  return (
    <button className="button" onClick={fn}>
      {text}
    </button>
  );
};

export default Button;
