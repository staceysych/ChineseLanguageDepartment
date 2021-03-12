import React from 'react';

import Slider from '../../Slider';

import { Hieroglyph } from '../../../icons';

export const sliderElement = (data) => (
  <>
    <h2 className="TeachersPage__title">{data.heading}</h2>
    <Slider teacherInfo={data.teachers} />
    <img className="TeachersPage__icon" src={Hieroglyph} alt="Hieroglyph" />
  </>
);
