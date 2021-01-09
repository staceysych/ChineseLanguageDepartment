import React from 'react';

import './TeachersPage.scss';

import Label from '../Label';
import Slider from '../Slider';

const TeachersPage = () => {
  return (
    <div className="TeachersPage container page">
      <Label text="Преподаватели" />
      <Slider />
    </div>
  );
};

export default TeachersPage;
