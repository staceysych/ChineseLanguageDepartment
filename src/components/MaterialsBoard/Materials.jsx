import React from 'react';

import { mockedData, filterData } from '../../utils';
import {
  renderStudyMaterials,
  renderScienceMaterials,
  isStudyPage,
  isSciencePage,
} from './Materials.utils';

import { CONSTANTS } from '../../constants';

const Materials = ({ path, page }) => {
  const { materials } = filterData(mockedData, 'page', page);
  const { docs } = filterData(materials, 'path', path);

  return (
    <div>
      <div className="Materials">
        {isStudyPage(page)
          ? CONSTANTS.UNI_YEARS.map((year, index) =>
              renderStudyMaterials(path, docs, year, index)
            )
          : null}
        {isSciencePage(page) ? renderScienceMaterials(path, docs) : null}
      </div>
    </div>
  );
};

export default Materials;
