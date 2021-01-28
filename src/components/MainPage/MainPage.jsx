import React, { useEffect } from 'react';
import { useMessage, useHttp } from '../../utils'
import { Link } from '@reach/router';
import { connect } from 'react-redux';
import { Spin } from 'antd';

import { ACTIONS } from '../../store/actions/creators';

import Button from '../Button';
import ChangeModal from '../ChangeModal'
import CopyRight from '../CopyRight';

import './MainPage.scss';

import { Dragon } from '../../icons';

import { CONSTANTS, URLS } from '../../constants';

const MainPage = ({ setFetchedData, data }) => {
  const { request, error, clearError } = useHttp()
  const message = useMessage()

  useEffect(() => {
    request(URLS.MAIN_PAGE)
      .then((response)=> {
        setFetchedData(response)
      }).catch((e) => {}) 
  }, []);

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  console.log(data);

  const mainPageElement = (
    <>
      < ChangeModal data={data} />
      <h2 className="MainPage__title">{data.heading}</h2>
      <div className="MainPage__description">{data.mainDescription}</div>
      <img className="MainPage__icon" src={Dragon} alt="dragon" />
      <Link to="about">
        <Button
          text={CONSTANTS.ABOUT}
          className="MainPage__btn"
        />
      </Link>
      <CopyRight />
    </>
  );

  return (
    <div className="MainPage container page">
      { data.page === 'main'  ? mainPageElement : <Spin size="large" />}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.pages.isLoading,
  data: state.pages.data,
});

export default connect(mapStateToProps, { setLoading: ACTIONS.setLoading, setFetchedData: ACTIONS.setFetchedData })(
  MainPage
);
