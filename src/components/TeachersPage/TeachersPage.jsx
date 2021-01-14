import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';

import { ACTIONS } from '../../store/actions/creators';

import './TeachersPage.scss';

import Label from '../Label';
import Slider from '../Slider';

import { mockedData, filterData } from '../../utils';

const TeachersPage = ({ isLoading, setLoading }) => {
  const { label, heading, teacherInfo } = filterData(mockedData, 'page', 'teachers');
  const teachersPageElement = (
    <>
      <Label text={label} />
      <h2 className="TeachersPage__title">{heading}</h2>
      <Slider teacherInfo={teacherInfo} />
    </>
  );

  useEffect(() => {
    setLoading(false);
  }, []);

  return <div className="TeachersPage container page">
    {isLoading ? <Spin size="large" /> : teachersPageElement}
  </div>;
};

const mapStateToProps = (state) => ({
  isLoading: state.pages.isLoading,
});

export default connect(mapStateToProps, { setLoading: ACTIONS.setLoading })(
  TeachersPage
);
