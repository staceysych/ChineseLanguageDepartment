import React, { useEffect } from 'react';
import { useMessage, useHttp } from '../../utils';
import { connect } from 'react-redux';
import { Spin } from 'antd';

import { ACTIONS } from '../../store/actions/creators';

import './TeachersPage.scss';

import { URLS } from '../../constants';

import Label from '../Label';
import Slider from '../Slider';
import TableView from '../TableView';

const TeachersPage = ({ setFetchedData, children, data, path, history, setHistory }) => {
  const { request, error, clearError } = useHttp();
  const message = useMessage();

  useEffect(() => {
    const oldPage = history.find((item) => item.page ===  path );
    if (oldPage) {
      setFetchedData({ ...oldPage });
    } else {
      request(`${URLS.SERVER_URL}${path}`)
        .then((response) => {
          setFetchedData({ ...response.page, teachers: response.teachers });
          setHistory(history, {
            ...response.page,
            teachers: response.teachers,
          });
        })
        .catch((e) => {});
    }
  }, []);

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const sliderElement = (
    <>
      <h2 className="TeachersPage__title">{data.heading}</h2>
      <Slider teacherInfo={data.teachers} />
    </>
  );
//TODO: только если режим админа
  const teachersPageElement = (
    <>
      <Label text={data.label} />
      {window.location.pathname === '/teachers' ? sliderElement : children}
      <TableView />
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
  history: state.pages.history,
});

export default connect(mapStateToProps, {
  setFetchedData: ACTIONS.setFetchedData,
  setHistory: ACTIONS.setHistory,
})(TeachersPage);
