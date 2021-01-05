import React from 'react';

import './MainPage.scss';

import { Dragon } from '../../icons';

import Button from '../Button';
import CopyRight from '../CopyRight';

import { CONSTANTS } from '../../constants';

const MainPage = () => {
  return (
    <div className="MainPage container">
      <h2 className="MainPage__title">{CONSTANTS.LOGO}</h2>
      <div className="MainPage__description">
        {CONSTANTS.FACULTY}
        <br />
        {CONSTANTS.UNI}
      </div>
      <img className="MainPage__icon" src={Dragon} alt="dragon" />
      <Button text={CONSTANTS.ABOUT} />
      <CopyRight />
    </div>
  );
};

export default MainPage;
