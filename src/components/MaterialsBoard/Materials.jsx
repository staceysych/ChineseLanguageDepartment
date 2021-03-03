import React from 'react';
import { connect } from 'react-redux';

import { filterData } from '../../utils';
import {
  renderStudyMaterials,
  renderScienceMaterials,
  isStudyPage,
  isSciencePage,
} from './Materials.utils';

import { CONSTANTS } from '../../constants';

const Materials = ({ path, page, data }) => {
  const materials = data.materials && filterData(data.materials, 'path', path);

  return (
    <div>
      <div className="Materials">
        {isStudyPage(page) &&
          materials &&
          CONSTANTS.UNI_YEARS.map((year, index) =>
            renderStudyMaterials(path, materials.docs, year, index)
          )}
        {isSciencePage(page) &&
          materials &&
          renderScienceMaterials(path, materials.docs)}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.pages.data,
});

export default connect(mapStateToProps)(Materials);
