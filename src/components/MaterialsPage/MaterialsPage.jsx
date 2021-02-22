import React, { useEffect } from 'react';
import { useHttp, useMessage } from '../../utils';
import { Link } from '@reach/router';
import { connect } from 'react-redux';
import { Spin } from 'antd';

import { ACTIONS } from '../../store/actions/creators';

import './MaterialsPage.scss';

import { URLS } from '../../constants';

import Label from '../Label';
import TableView from '../TableView';

const isActive = ({ isCurrent }) => {
  return isCurrent
    ? { className: 'MaterialsPage__link MaterialsPage__link_active' }
    : {};
};

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
          if (path === 'study') {
            setFetchedData({
              ...response.page,
              materials: response.materials[0].materials,
            });
            setHistory(history, {
              ...response.page,
              materials: response.materials[0].materials,
            });
          } else if (path === 'science') {
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

  const userView = (
    <>
      <Label text={data.label} />
      <div className="MaterialsPage__layout">
        <ul className="MaterialsPage__nav">
          {data.materials ? (
            data.materials.map(({ name, path }) => (
              <Link
                className="MaterialsPage__link"
                key={path}
                to={path}
                onClick={() => setPath(path)}
                getProps={isActive}
              >
                <li key={name}>{name}</li>
              </Link>
            ))
          ) : (
            <Spin size="large" />
          )}
        </ul>
        {children}
      </div>
    </>
  );

  const materialPageElement =  token ? <TableView path={path} /> : userView;

  return (
    <div className="MaterialsPage container page">
      {data.page === 'study' || data.page === 'science' ? (
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
