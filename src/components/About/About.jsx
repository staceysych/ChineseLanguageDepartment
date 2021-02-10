import React, { useEffect, useState } from 'react';
import { useHttp, useMessage } from '../../utils';
import { connect } from 'react-redux';

import { Spin } from 'antd';

import './About.scss';

import { URLS, CONSTANTS } from '../../constants';

import Button from '../Button';
import Label from '../Label';
import GordeiPhoto from '../../icons/teachers/Gordei.jpg';

import { ACTIONS } from '../../store/actions/creators';

const About = ({ setFetchedData, data, path, history, setHistory }) => {
  const { request, error, clearError } = useHttp();
  const message = useMessage();
  const [isContacts, setContacts] = useState(false);

  useEffect(() => {
    const oldPage = history.find(item => item.page === path)
    if (oldPage){
      setFetchedData({...oldPage})
    } else {
        request(`${URLS.SERVER_URL}${path}`)
        .then((response) => {
          setFetchedData(response);
          setHistory(history, response)
        })
        .catch((e) => {});
      }
  }, []);

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);
  
  const openModal = () => {
    setContacts(true);
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
    personEmail,
    personWebsite,
    mobile,
  } = data;

  const contactsElement = (
    <div className="About__admin_contacts">
      <h3>{CONSTANTS.CONTACTS.NAME}</h3>
      <p>
        {CONSTANTS.CONTACTS.MOBILE}: <a href={`tel:${mobile}`}>{mobile}</a>
      </p>
      <p>
        {CONSTANTS.CONTACTS.EMAIL}:{' '}
        <a href={`mailto:${personEmail}`}>{personEmail}</a>
      </p>
      <p>
        {CONSTANTS.CONTACTS.WEBSITE}:{' '}
        <a href={personWebsite}>{personWebsite}</a>
      </p>
    </div>
  );

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
          <span className="About__admin_name">{detailsInfo}</span>
          <div className="About__admin_contacts">
            <span>{addressPlace}</span> {addressRoom}
            <br />
            <span>{mailName}</span> {''}
            <a href={`mailto:${email}`}>{email}</a>
          </div>
        </div>
        <div className="About__admin_details">
          {isContacts ? (
            contactsElement
          ) : (
            <div className="About__admin_photo">
              <img src={GordeiPhoto} />
            </div>
          )}
          {isContacts ? null : (
            <Button className="About__btn" text="Контакты" fn={openModal} />
          )}
        </div>
      </div>
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
  history: state.pages.history,
});

export default connect(mapStateToProps, {
  setModalOpen: ACTIONS.setModalOpen,
  setFetchedData: ACTIONS.setFetchedData,
  setHistory: ACTIONS.setHistory,
})(About);
