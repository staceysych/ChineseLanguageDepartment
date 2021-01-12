import React from 'react';
import { Link } from '@reach/router';

import './StudyPage.scss';

import Label from '../Label';
import MaterialsBoard from '../MaterialsBoard';

import { mockedData, filterData } from '../../utils';

const StudyPage = () => {
  const { label, materials } = filterData(mockedData, 'study');
  return (
    <div className="StudyPage container page">
      <Label text={label} />
      <div className="StudyPage__layout">
        <ul className="StudyPage__nav">
          {materials.map(({ name, path }) => (
            <Link to={path}><li key={name}>{name}</li></Link>
          ))}
        </ul>
        <MaterialsBoard />
      </div>
    </div>
  );
};

export default StudyPage;
