import React from 'react';

import { CONSTANTS } from '../../../constants';
import { sliderElement } from './slider-element';

import Label from '../../Label';

export const userView = (data, children) => (
  <>
    <Label text={data.label} />
    {window.location.pathname === `/${CONSTANTS.TEACHERS_PAGE}`
      ? sliderElement(data)
      : children}
  </>
);
