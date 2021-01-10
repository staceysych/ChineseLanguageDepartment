import React, { useRef } from 'react';
import { Carousel } from 'antd';

import './Slider.scss';

import Button from '../Button';

const Slider = ({ teacherInfo }) => {
  const carouselRef = useRef();
  const contentStyle = {
    height: '350px',
    background: '#F6F0F0',
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-between',
  };

  const handleNextSlide = () => {
    carouselRef.current.next();
  };

  const handlePrevSlide = () => {
    carouselRef.current.prev();
  };

  return (
    <div className="Slider">
      <Button className="Slider__nav_btn" text="<" fn={handlePrevSlide} />
      <Carousel dots="false" autoplay autoplaySpeed="50" ref={carouselRef}>
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
      <Button className="Slider__nav_btn" text=">" fn={handleNextSlide} />
    </div>
  );
};

export default Slider;
