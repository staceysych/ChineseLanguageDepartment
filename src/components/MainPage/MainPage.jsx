import React, { useEffect } from 'react';
import { Link } from '@reach/router';
import { connect } from 'react-redux';
import { Spin } from 'antd';

import Button from '../Button';
import CopyRight from '../CopyRight';
import { Dragon } from '../../icons';

import './MainPage.scss';

import { ACTIONS } from '../../store/actions/creators';

import { CONSTANTS, URLS } from '../../constants';

import { useHttp } from '../../utils';

const MainPage = ({ setFetchedData, data, history, setHistory }) => {
  const { request } = useHttp();

  useEffect(() => {
    const oldPage = history.find((item) => item.page === CONSTANTS.MAIN_PAGE);
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
      {data.page === CONSTANTS.MAIN_PAGE ? (
        mainPageElement
      ) : (
        <Spin size="large" />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.pages.data,
  history: state.pages.history,
});

export default connect(mapStateToProps, {
  setLoading: ACTIONS.setLoading,
  setFetchedData: ACTIONS.setFetchedData,
  setHistory: ACTIONS.setHistory,
})(MainPage);
