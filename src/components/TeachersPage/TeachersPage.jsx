import React from 'react';

import './TeachersPage.scss';

import Label from '../Label';
import Slider from '../Slider';

import { mockedData, filterData } from '../../utils';

const TeachersPage = () => {
  const {
    label,
    heading,
    teacherInfo,
  } = filterData(mockedData, 'teachers');

  return (
    <div className="TeachersPage container page">
      <Label text={label} />
      <h2 className="TeachersPage__title">{heading}</h2>
      <Slider teacherInfo={teacherInfo} />
    </div>
  );
};

export default TeachersPage;
