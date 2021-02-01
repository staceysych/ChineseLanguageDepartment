import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { Carousel } from 'antd';

import './Slider.scss';

import { ACTIONS } from '../../store/actions/creators';

import Button from '../Button';

const Slider = ({ teacherInfo, setModalOpen }) => {
  const carouselRef = useRef();

  const handleNextSlide = () => {
    carouselRef.current.next();
  };

  const handlePrevSlide = () => {
    carouselRef.current.prev();
  };

  const openModal = () => {
    setModalOpen(true);
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
                <Button className="Slider__btn" text="Подробнее" fn={openModal} />
              </div>
            </div>
          </div>
        ))}
      </Carousel>
      <Button className="Slider__nav_btn" text=">" fn={handleNextSlide} />
    </div>
  );
};

export default connect(null, {
  setModalOpen: ACTIONS.setModalOpen,
})(Slider);
