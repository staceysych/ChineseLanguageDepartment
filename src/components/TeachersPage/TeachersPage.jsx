import React, { useEffect, useState } from 'react';
import { useMessage, useHttp } from '../../utils'
import { connect } from 'react-redux';
import { Spin } from 'antd';

import { ACTIONS } from '../../store/actions/creators';

import './TeachersPage.scss';

import { URLS } from '../../constants';

import Label from '../Label';
import Slider from '../Slider';

const TeachersPage = ({ setFetchedData, data = {} }) => {
  const { request, error, clearError } = useHttp()
  const message = useMessage()

  useEffect(() => {
    data = {}
    request(URLS.TEACHERS_URL)
      .then((response)=> {
        setFetchedData({...response.page, teachers: response.teachers})
      }).catch((e) => {}) 
  }, []);

  console.log(data);

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  const teachersPageElement = (
    <>
      <Label text={data.label} />
      <h2 className="TeachersPage__title">{data.heading}</h2>
      <Slider teacherInfo={data.teachers} />
    </>
  );

  return <div className="TeachersPage container page">
    {data.page === 'teachers' ? teachersPageElement : <Spin size="large" />}
  </div>;
};

const mapStateToProps = (state) => ({
  isLoading: state.pages.isLoading,
  data: state.pages.data,
});

export default connect(mapStateToProps, { setLoading: ACTIONS.setLoading, setFetchedData: ACTIONS.setFetchedData})(
  TeachersPage
);
