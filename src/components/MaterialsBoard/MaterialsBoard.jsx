import React from 'react';

import './MaterialsBoard.scss';

import { Hieroglyph } from '../../icons';
import { CONSTANTS } from '../../constants';

const MaterialsBoard = () => {
  return (
    <div className="MaterialsBoard">
      <h4 className="MaterialsBoard__title">{CONSTANTS.NO_INFO_TEXT}</h4>
      <img src={Hieroglyph} alt="Hieroglyph" />
    </div>
  );
};

export default MaterialsBoard;
