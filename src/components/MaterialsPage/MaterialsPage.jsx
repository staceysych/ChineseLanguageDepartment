import React from 'react';
import { Link } from '@reach/router';
import { connect } from 'react-redux';

import { ACTIONS } from '../../store/actions/creators';

import './MaterialsPage.scss';

import Label from '../Label';

import { mockedData, filterData } from '../../utils';

const isActive = ({ isCurrent }) => {
  return isCurrent
    ? { className: 'MaterialsPage__link MaterialsPage__link_active' }
    : {};
};

const MaterialsPage = ({ children, setPath, path }) => {
  const { label, materials } = filterData(mockedData, 'page', path);

  return (
    <div className="MaterialsPage container page">
      <Label text={label} />
      <div className="MaterialsPage__layout">
        <ul className="MaterialsPage__nav">
          {materials.map(({ name, path }) => (
            <Link
              className="MaterialsPage__link"
              key={path}
              to={path}
              onClick={() => setPath(path)}
              getProps={isActive}
            >
              <li key={name}>{name}</li>
            </Link>
          ))}
        </ul>
        {children}
      </div>
    </div>
  );
};

export default connect(null, { setPath: ACTIONS.setPath })(MaterialsPage);
