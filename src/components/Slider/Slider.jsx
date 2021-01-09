import React from 'react';
import { Carousel } from 'antd';

import './Slider.scss';

import { mockedData, filterData } from '../../utils';

const Slider = () => {
  const { teacherInfo } = filterData(mockedData, 'teachers');

  const contentStyle = {
    height: '428px',
    background: '#364d79',
  };

  return (
    <div className="Slider">
      <Carousel autoplay dotPosition="right">
      </Carousel>
    </div>
  );
};

export default Slider;
