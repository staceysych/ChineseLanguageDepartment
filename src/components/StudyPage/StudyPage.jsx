import React from 'react';
import { Link } from '@reach/router';
import { connect } from 'react-redux';

import { ACTIONS } from '../../store/actions/creators';

import './StudyPage.scss';

import Label from '../Label';

import { mockedData, filterData } from '../../utils';

const isActive = ({ isCurrent }) => {
  return isCurrent
    ? { className: 'StudyPage__link StudyPage__link_active' }
    : {};
};

const StudyPage = ({ children, setPath }) => {
  const { label, materials } = filterData(mockedData, 'page', 'study');
  return (
    <div className="StudyPage container page">
      <Label text={label} />
      <div className="StudyPage__layout">
        <ul className="StudyPage__nav">
          {materials.map(({ name, path }) => (
            <Link
              className="StudyPage__link"
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

export default connect(null, { setPath: ACTIONS.setPath })(StudyPage);
