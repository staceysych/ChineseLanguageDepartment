import React, { useEffect } from 'react';
import { useMessage, useHttp } from '../../utils';
import { connect } from 'react-redux';
import { Spin } from 'antd';

import { ACTIONS } from '../../store/actions/creators';

import './TeachersPage.scss';

import { URLS } from '../../constants';

import Label from '../Label';
import Slider from '../Slider';
import { InfoModal } from '../Modals';

const TeachersPage = ({ setFetchedData, data, path }) => {
  const { request, error, clearError } = useHttp();
  const message = useMessage();

  useEffect(() => {
    request(`${URLS.SERVER_URL}${path}`)
      .then((response) => {
        setFetchedData({ ...response.page, teachers: response.teachers });
      })
      .catch((e) => {});
  }, []);

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const teachersPageElement = (
    <>
      <Label text={data.label} />
      <h2 className="TeachersPage__title">{data.heading}</h2>
      <Slider teacherInfo={data.teachers} />
      <InfoModal />
    </>
  );

  return (
    <div className="TeachersPage container page">
      {data.page === 'teachers' ? teachersPageElement : <Spin size="large" />}
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.pages.data,
});

export default connect(mapStateToProps, {
  setFetchedData: ACTIONS.setFetchedData,
})(TeachersPage);
