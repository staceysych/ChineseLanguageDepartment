import React from 'react';

export const splitText = (text) => {
  return text &&
    text.split('\n').map((i) => {
      return <p key={i}>{i}</p>;
    });
};
