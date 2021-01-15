import React, { useEffect, useState } from 'react';
import { Link } from '@reach/router';
import { connect } from 'react-redux';
import { Spin } from 'antd';

import { ACTIONS } from '../../store/actions/creators';

import './MainPage.scss';

import { Dragon } from '../../icons';

import Button from '../Button';
import CopyRight from '../CopyRight';
import { useHttp } from '../../utils/request'
import { CONSTANTS } from '../../constants';


const MainPage = ({ setLoading, isLoading }) => {
  const [data, setData] = useState({})
  const { request, error, clearError } = useHttp()

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


  const { main, featuresInfo, featuresTitle, title, info, page, heading, label, mobile, place, room, email, name } = data

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
