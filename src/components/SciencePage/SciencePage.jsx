import React from 'react';
import { Link } from '@reach/router';
import { connect } from 'react-redux';

import { ACTIONS } from '../../store/actions/creators';

import './StudyPage.scss';

import Label from '../Label';

import { mockedData, filterData } from '../../utils';

import './SciencePage.scss';

const SciencePage = ({ children, setPath }) => {
  const { label, materials } = filterData(mockedData, 'page', 'study');
  return (
    <div className="SciencePage page container">
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

export default connect(null, { setPath: ACTIONS.setPath })(SciencePage);
