import React, { useEffect } from 'react';
import { useHttp } from '../../utils';
import { connect } from 'react-redux';
import { Spin } from 'antd';

import { ACTIONS } from '../../store/actions/creators';

import { Hieroglyph } from '../../icons';

import './TeachersPage.scss';

import { URLS } from '../../constants';

import Label from '../Label';
import Slider from '../Slider';
import TableView from '../TableView';

const TeachersPage = ({
  setFetchedData,
  children,
  data,
  path,
  history,
  setHistory,
  userData: { token },
}) => {
  const { request } = useHttp();

  useEffect(() => {
    const oldPage = history.find((item) => item.page === path);
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


  const sliderElement = (
    <>
      <h2 className="TeachersPage__title">{data.heading}</h2>
      <Slider teacherInfo={data.teachers} />
      <img className="TeachersPage__icon" src={Hieroglyph} alt="Hieroglyph" />
    </>
  );

  const userView = (
    <>
      <Label text={data.label} />
      {window.location.pathname === '/teachers' ? sliderElement : children}
    </>
  );

  const teachersPageElement =  token ? <TableView path={path} /> : userView;

  return (
    <div className="TeachersPage container page">
      {data.page === 'teachers' ? teachersPageElement : <Spin size="large" />}
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.pages.data,
  history: state.pages.history,
  userData: state.pages.userData,
});

export default connect(mapStateToProps, {
  setFetchedData: ACTIONS.setFetchedData,
  setHistory: ACTIONS.setHistory,
})(TeachersPage);
