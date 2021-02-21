import React, { useEffect } from 'react';
import { useMessage, useHttp } from '../../utils';
import { Link } from '@reach/router';
import { connect } from 'react-redux';
import { Spin } from 'antd';

import { ACTIONS } from '../../store/actions/creators';

import Button from '../Button';
import ChangeModal from '../ChangeModal';
import CopyRight from '../CopyRight';

import './MainPage.scss';

import { Dragon } from '../../icons';

import { CONSTANTS, URLS } from '../../constants';

const MainPage = ({
  setFetchedData,
  data,
  userData: { token },
  history,
  setHistory,
}) => {
  const { request, error, clearError } = useHttp();

  useEffect(() => {
    const oldPage = history.find((item) => item.page === 'main');
    if (oldPage) {
      setFetchedData({ ...oldPage });
    } else {
      request(URLS.SERVER_URL)
        .then((response) => {
          setFetchedData(response);
          setHistory(history, response);
        })
        .catch((e) => {});
    }
  }, []);

  const mainPageElement = (
    <>
      {token ? <ChangeModal data={data} token={token} /> : null}
      <h2 className="MainPage__title">{data.heading}</h2>
      <div className="MainPage__description">{data.mainDescription}</div>
      <img className="MainPage__icon" src={Dragon} alt="dragon" />
      <Link to="about">
        <Button text={CONSTANTS.ABOUT} className="MainPage__btn" />
      </Link>
      <CopyRight />
    </>
  );

  return (
    <div className="MainPage container page">
      {data.page === 'main' ? mainPageElement : <Spin size="large" />}
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.pages.data,
  userData: state.pages.userData,
  history: state.pages.history,
});

export default connect(mapStateToProps, {
  setLoading: ACTIONS.setLoading,
  setFetchedData: ACTIONS.setFetchedData,
  setHistory: ACTIONS.setHistory,
})(MainPage);
