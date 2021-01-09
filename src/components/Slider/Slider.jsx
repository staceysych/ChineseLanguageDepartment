import React from 'react';
import { Carousel } from 'antd';

import './Slider.scss';

import Button from '../Button';

const Slider = ({ teacherInfo }) => {
  const contentStyle = {
    height: '350px',
    background: '#F6F0F0',
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-between',
  };

  return (
    <div className="Slider">
      <Carousel dotPosition="right" autoplay autoplaySpeed="50">
        {teacherInfo.map((obj, index) => (
          <div key={index}>
            <div className="Slider__content" style={contentStyle}>
              <div className="Slider__photo">
                <img src={obj.photo} className="teachers-photo" />
              </div>
              <div className="Slider__description">
                <div className="Slider__description_text">
                  <h3>{obj.name}</h3>
                  <p>{obj.info.position}</p>
                  <p>{obj.info.degrees}</p>
                  <p>{obj.info.subjects}</p>
                </div>
                <Button className="Slider__btn" text="Подробнее" />
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Slider;
