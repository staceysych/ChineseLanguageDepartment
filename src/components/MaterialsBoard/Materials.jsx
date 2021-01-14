import React from 'react';

import { mockedData, filterData } from '../../utils';
import { renderExamMaterials } from './Materials.utils';

const Materials = ({ path }) => {
  const { materials } = filterData(mockedData, 'page', 'study');
  const { docs } = filterData(materials, 'path', path);

  return (
    <div>
      <div className="Materials">
        {renderExamMaterials(path, docs, 1)}
        {renderExamMaterials(path, docs, 2)}
      </div>
    </div>
  );
};

export default Materials;
