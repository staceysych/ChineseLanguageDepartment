import React, { useEffect } from 'react';
import { useHttp } from '../../utils';
import { connect } from 'react-redux';
import { Card, Spin } from 'antd';

import { ACTIONS } from '../../store/actions/creators';

import './ContactsPage.scss';

import { URLS, CONSTANTS } from '../../constants';
import { generateRandomId } from '../../utils';
import { media } from './utils';

import Label from '../Label';
import Map from '../Map';
import CopyRight from '../CopyRight';

const ContactsPage = ({ path, setFetchedData, data, history, setHistory }) => {
  const { request } = useHttp();

  useEffect(() => {
    const oldPage = history.find((item) => item.page === path);
    if (oldPage) {
      setFetchedData({ ...oldPage });
    } else {
      request(`${URLS.SERVER_URL}${path}`)
        .then((response) => {
          setFetchedData(response);
          setHistory(history, response);
        })
        .catch((e) => {});
    }
  }, []);

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
            {media(data).map(({ link, icon }) => (
              <a target="_blank" key={generateRandomId()} href={link}>
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
      {data.page === CONSTANTS.CONTACTS_PAGE ? page : <Spin size="large" />}
      <CopyRight />
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.pages.data,
  history: state.pages.history,
});

export default connect(mapStateToProps, {
  setFetchedData: ACTIONS.setFetchedData,
  setHistory: ACTIONS.setHistory,
})(ContactsPage);
