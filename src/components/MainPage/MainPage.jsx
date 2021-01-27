import React, { useEffect, useState } from 'react';
import { useHttp } from '../../utils/request'
import { useMessage } from '../../utils/errorPopup'
import { Link } from '@reach/router';
import { connect } from 'react-redux';
import { Spin } from 'antd';

import { ACTIONS } from '../../store/actions/creators';

import Button from '../Button';
import ChangeModal from '../ChangeModal'
import CopyRight from '../CopyRight';

import './MainPage.scss';

import { Dragon } from '../../icons';

import { CONSTANTS } from '../../constants';

const MainPage = ({ setLoading, isLoading, setFetchedData, data }) => {
  const [data1, setData] = useState({})
  const { request, error, clearError } = useHttp()
  const message = useMessage()

  const changeLoading = () => {
    setLoading(true);
  };

  useEffect(() => {
    setLoading(true)
    const requestHandler = async () => {
      try {
        const response = await request('http://localhost:4000/');
        setData(response)
        setFetchedData(response)
      } catch (e) { }
      setLoading(false);
    }
    requestHandler()
  }, []);

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  const { mainDescription, heading } = data1

  const mainPageElement = (
    <>
      < ChangeModal data={data} />
      <h2 className="MainPage__title">{heading}</h2>
      <div className="MainPage__description">{mainDescription}</div>
      <img className="MainPage__icon" src={Dragon} alt="dragon" />
      <Link to="about">
        <Button
          text={CONSTANTS.ABOUT}
          fn={changeLoading}
          className="MainPage__btn"
        />
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
  data: state.pages.data,
});

export default connect(mapStateToProps, { setLoading: ACTIONS.setLoading, setFetchedData: ACTIONS.setFetchedData })(
  MainPage
);
