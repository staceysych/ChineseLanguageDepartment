import React, { useEffect, useState } from 'react';
import { useHttp } from '../../utils';
import { connect } from 'react-redux';

import { Spin } from 'antd';

import './About.scss';

import { URLS, CONSTANTS } from '../../constants';
import { contactsElement } from './utils';

import Button from '../Button';
import Label from '../Label';

import { ACTIONS } from '../../store/actions/creators';

const About = ({ setFetchedData, data, path, history, setHistory }) => {
  const { request } = useHttp();
  const [isContacts, setContacts] = useState(false);
  const { ABOUT_PAGE, CONTACTS } = CONSTANTS;

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
    detailsPhoto,
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
            contactsElement(data)
          ) : (
            <div className="About__admin_photo">
              <img src={detailsPhoto} />
            </div>
          )}
          {!isContacts && (
            <Button className="About__btn" text={CONTACTS} fn={openModal} />
          )}
        </div>
      </div>
    </>
  );

  return (
    <div className="About container page">
      {data.page === ABOUT_PAGE ? aboutElement : <Spin size="large" />}
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
