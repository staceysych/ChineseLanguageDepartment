import React, { useEffect, useState } from 'react';
import { useHttp } from '../../utils/request'
import { useMessage } from '../../utils/errorPopup'
import { connect } from 'react-redux';
import { Spin } from 'antd';

import { ACTIONS } from '../../store/actions/creators';

import './TeachersPage.scss';

import Label from '../Label';
import Slider from '../Slider';

const TeachersPage = ({ isLoading, setLoading }) => {
  const [data, setData] = useState({})
  const [teachers, setTeachers] = useState([])
  const { request, error, clearError } = useHttp()
  const message = useMessage()

  useEffect(() => {

    const requestHandler = async () => {
      try {
        setLoading(true)
        const response = await request('http://localhost:4000/teachers');
        setTeachers(response.teachers)
        setData(response.page)
        setLoading(false);
      } catch (e) {
        setLoading(true)
      }
    }
    requestHandler()
  }, []);

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  const teachersPageElement = (
    <>
      <Label text={data.label} />
      <h2 className="TeachersPage__title">{data.heading}</h2>
      <Slider teacherInfo={teachers} />
    </>
  );

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
