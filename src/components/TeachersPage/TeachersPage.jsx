import React, { useEffect } from 'react';
import { useHttp } from '../../utils';
import { connect } from 'react-redux';
import { Spin } from 'antd';

import { ACTIONS } from '../../store/actions/creators';

import './TeachersPage.scss';

import { URLS, CONSTANTS } from '../../constants';
import { userView } from './utils';

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

  const teachersPageElement = token ? (
    <TableView path={path} />
  ) : (
    userView(data, children)
  );

  return (
    <div className="TeachersPage container page">
      {data.page === CONSTANTS.TEACHERS_PAGE ? (
        teachersPageElement
      ) : (
        <Spin size="large" />
      )}
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
