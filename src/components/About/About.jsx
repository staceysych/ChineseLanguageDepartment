import React, { useEffect } from 'react';
import { useHttp, useMessage } from '../../utils';
import { connect } from 'react-redux';

import { Spin } from 'antd';

import './About.scss';

import { URLS } from '../../constants';

import Button from '../Button';
import Label from '../Label';
import { InfoModal } from '../Modals';
import GordeiPhoto from '../../icons/teachers/Gordei.jpg';

import { ACTIONS } from '../../store/actions/creators';

const About = ({ setFetchedData, data, setModalOpen, path }) => {
  const { request, error, clearError } = useHttp();
  const message = useMessage();

  useEffect(() => {
    request(`${URLS.SERVER_URL}${path}`)
      .then((response) => {
        setFetchedData(response);
      })
      .catch((e) => {});
  }, []);

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const openModal = () => {
    setModalOpen(true);
  };

  const {
    mainDescription,
    featuresInfo,
    featuresTitle,
    heading,
    label,
    detailsTitle,
    detailsInfo,
    addressPlace,
    addressRoom,
    mailName,
    email,
  } = data;

  const aboutElement = (
    <>
      <Label text={label} />
      <h3 className="About__title">{heading}</h3>
      <div className="About__description">
        <div className="About__description_info">{mainDescription}</div>
        <div className="About__description_features">
          <h3>{featuresTitle}</h3>
          {featuresInfo}
        </div>
      </div>
      <div className="About__admin">
        <div className="About__admin_info">
          <h3>{detailsTitle}</h3>
          <span>{detailsInfo}</span>
          <div className="About__admin_contacts">
            <span>{addressPlace}</span> {addressRoom}
            <br />
            <span>{mailName}</span> {''}
            <a href={`mailto:${email}`}>{email}</a>
          </div>
        </div>
        <div className="About__admin_details">
          <div className="About__admin_photo">
            <img src={GordeiPhoto} />
          </div>
          <Button className="About__btn" text="Контакты" fn={openModal} />
        </div>
      </div>
      <InfoModal />
    </>
  );

  return (
    <div className="About container page">
      {data.page === 'about' ? aboutElement : <Spin size="large" />}
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.pages.data,
});

export default connect(mapStateToProps, {
  setModalOpen: ACTIONS.setModalOpen,
  setFetchedData: ACTIONS.setFetchedData,
})(About);
