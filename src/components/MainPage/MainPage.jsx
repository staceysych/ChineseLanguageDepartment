import React, { useEffect, useState } from 'react';
import { useHttp } from '../../utils/request'
import { useMessage } from '../../utils/errorPopup'
import { Link } from '@reach/router';
import { connect } from 'react-redux';
import { Spin } from 'antd';

import { ACTIONS } from '../../store/actions/creators';

import './MainPage.scss';

import { Dragon } from '../../icons';

import Button from '../Button';
import CopyRight from '../CopyRight';
import { CONSTANTS } from '../../constants';

const MainPage = ({ setLoading, isLoading }) => {
<<<<<<< HEAD
  const [data, setData] = useState({})
  const { request, error, clearError } = useHttp()
  const message = useMessage()
=======
  const {
    heading,
    description: { main },
  } = filterData(mockedData, 'page', 'main');
>>>>>>> develop

  const changeLoading = () => {
    setLoading(true);
  };

  useEffect(() => {
    setLoading(true)
    const requestHandler = async () => {
      try {
        const response = await request('http://localhost:4000/');
        setData(response)
      } catch (e) { }
      setLoading(false);
    }
    requestHandler()
  }, []);

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])


  const { main, heading } = data

  const mainPageElement = (
    <>
      <h2 className="MainPage__title">{heading}</h2>
      <div className="MainPage__description">{main}</div>
      <img className="MainPage__icon" src={Dragon} alt="dragon" />
      <Link to="about">
        <Button text={CONSTANTS.ABOUT} fn={changeLoading} />
      </Link>
      <CopyRight />
    </>
  );

  return (
    <div className="MainPage container page">
      {isLoading ? <Spin size="large" /> : mainPageElement}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.pages.isLoading,
});

export default connect(mapStateToProps, { setLoading: ACTIONS.setLoading })(
  MainPage
);
