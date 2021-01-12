import React, { useEffect, useState } from 'react';
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
  const [data, setData] = useState({})

  const changeLoading = () => {
    setLoading(true);
  };
  const get = async () => {
    const PageFetch = await fetch('http://localhost:4000/teachers/', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
        'Access-Control-Request-Method': 'GET, POST, DELETE, PUT, OPTIONS',
      }
    })
    const data = await PageFetch.json();
    return data
  }

  useEffect(() => {
    setLoading(true)
    const resp = async () => {
      const res = await get();
      setData(res)
      setLoading(false);
    }
    resp()
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
    <div className="MainPage container">
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
