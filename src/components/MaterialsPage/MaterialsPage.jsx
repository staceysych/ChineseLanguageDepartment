import React, { useEffect } from 'react';
import { useHttp, useMessage } from '../../utils';
import { connect } from 'react-redux';
import { Spin } from 'antd';

import { ACTIONS } from '../../store/actions/creators';

import './MaterialsPage.scss';

import { URLS, CONSTANTS } from '../../constants';
import { userView } from './utils';

import TableView from '../TableView';

const MaterialsPage = ({
  children,
  setPath,
  path,
  setFetchedData,
  data,
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
          if (path === CONSTANTS.STUDY_PAGE) {
            setFetchedData({
              ...response.page,
              materials: response.materials[0].materials,
            });
            setHistory(history, {
              ...response.page,
              materials: response.materials[0].materials,
            });
          } else if (path === CONSTANTS.SCIENCE_PAGE) {
            setFetchedData({
              ...response.page,
              materials: response.materials[0].scienceMaterials,
            });
            setHistory(history, {
              ...response.page,
              materials: response.materials[0].scienceMaterials,
            });
          }
        })
        .catch((e) => {});
    }
  }, []);

  const onLinkClick = (path) => {
    setPath(path);
  };

  const materialPageElement = token ? (
    <TableView path={path} />
  ) : (
    userView(data, children, onLinkClick)
  );

  return (
    <div className="MaterialsPage container page">
      {data.page === CONSTANTS.STUDY_PAGE ||
      data.page === CONSTANTS.SCIENCE_PAGE ? (
        materialPageElement
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
  setPath: ACTIONS.setPath,
  setFetchedData: ACTIONS.setFetchedData,
  setHistory: ACTIONS.setHistory,
})(MaterialsPage);
