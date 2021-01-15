import React, { useRef } from 'react';
import { Carousel } from 'antd';

import './Slider.scss';

import Button from '../Button';

const Slider = ({ teacherInfo }) => {
  const carouselRef = useRef();

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
            <div className="Slider__content">
              <div className="Slider__photo">
                <img src={obj.photo} className="teachers-photo" />
              </div>
              <div className="Slider__description">
                <div className="Slider__description_text">
                  <h3>{obj.name}</h3>
                  <p>{obj.position}</p>
                  <p>{obj.degrees}</p>
                  <p>{obj.subjects}</p>
                </div>
                <Button fn={() => console.log('1')} className="Slider__btn" text="Подробнее" />
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
