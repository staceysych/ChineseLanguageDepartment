import React, { useEffect } from 'react';
import { Link } from '@reach/router';
import { connect } from 'react-redux';
import { Spin } from 'antd';

import { ACTIONS } from '../../store/actions/creators';

import Button from '../Button';
import CopyRight from '../CopyRight';

import './MainPage.scss';

import { Dragon } from '../../icons';

import { CONSTANTS } from '../../constants';
import { filterData, mockedData } from '../../utils';

const MainPage = ({ setLoading, isLoading }) => {
  const {
    heading,
    description: { main },
  } = filterData(mockedData, 'page', 'main');

  const changeLoading = () => {
    setLoading(true);
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  const mainPageElement = (
    <>
      <h2 className="MainPage__title">{heading}</h2>
      <div className="MainPage__description">{main}</div>
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
});

export default connect(mapStateToProps, { setLoading: ACTIONS.setLoading })(
  MainPage
);
