import React, { useEffect } from 'react';
import { useHttp, useMessage } from '../../utils';
import { connect } from 'react-redux';
import { Card, Spin } from 'antd';

import { ACTIONS } from '../../store/actions/creators';

import './ContactsPage.scss';

import { URLS } from '../../constants';

import Label from '../Label';
import Map from '../Map';

const ContactsPage = ({ path, setFetchedData, data }) => {
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

  const media = [
    {
      link: data.mediaLink,
      icon: data.mediaIcon,
      name: data.mediaName,
    },
  ];

  const { addressPlace, addressRoom, phone, email, label, heading } = data;

  const page = (
    <>
      <Label text={label} />
      <div className="ContactsPage__layout">
        <Card className="ContactsPage__card" title={heading}>
          <p>{addressPlace}</p>
          <p>{addressRoom}</p>
          <p>
            <a href={`tel:${phone}`}>{phone}</a>
          </p>
          <p>
            <a href={`mailto:${email}`}>{email}</a>
          </p>
          <div className="ContactsPage__media">
            {media.map(({ link, icon, name }) => (
              <a target="_blank" key={name} href={link}>
                <img src={icon} alt="mslu" />
              </a>
            ))}
          </div>
        </Card>
        <Map address={addressPlace} />
      </div>
    </>
  );

  return (
    <div className="ContactsPage page container">
      {data.page === 'contacts' ? page : <Spin size="large" />}
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.pages.data,
});

export default connect(mapStateToProps, {
  setFetchedData: ACTIONS.setFetchedData,
})(ContactsPage);
