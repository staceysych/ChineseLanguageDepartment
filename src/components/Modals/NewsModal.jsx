import React from 'react';
import { connect } from 'react-redux';
import { ReactPhotoCollage } from 'react-photo-collage';
import { Empty } from 'antd';

import { generateRandomId } from '../../utils';

import './Modals.scss';

import Button from '../Button';

import { ACTIONS } from '../../store/actions/creators';

const NewsModal = ({ setModalOpen, allNews, index }) => {
  const currentNewsObj = allNews.news.filter((obj) => obj._id === index)[0];
  const photosForCollage = currentNewsObj.photos.map((url) => {
    return {
      src: url,
    };
  });
  const collageSetting = {
    width: '100%',
    height: ['250px', '160px'],
    layout: [1, 3],
    photos: photosForCollage,
    showNumOfRemainingPhotos: true,
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="Modal">
      <div className="Modal__layout">
        <div className="Modal__wrapper">
          <div className="Modal__content">
            <div className="Modal__collage">
              {currentNewsObj.photos.length ? (
                <ReactPhotoCollage {...collageSetting} />
              ) : (
                <Empty description="Нет фото" />
              )}
            </div>
            <div className="Modal__info custom-scroll">
              <h3>{currentNewsObj.title}</h3>
              {currentNewsObj.article.split('\n').map((i) => {
                return <p key={generateRandomId()}>{i}</p>;
              })}
            </div>
          </div>
        </div>
        <Button className="Modal__btn" text="Х" fn={closeModal} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isModalOpen: state.pages.isModalOpen,
  allNews: state.pages.allNews,
  index: state.pages.index,
});

export default connect(mapStateToProps, {
  setModalOpen: ACTIONS.setModalOpen,
})(NewsModal);
