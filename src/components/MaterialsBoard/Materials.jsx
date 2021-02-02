import React from 'react';
import { connect } from 'react-redux';
import { ACTIONS } from '../../store/actions/creators';

import { filterData } from '../../utils';
import {
  renderStudyMaterials,
  renderScienceMaterials,
  isStudyPage,
  isSciencePage,
} from './Materials.utils';

import { CONSTANTS } from '../../constants';

const Materials = ({ path, page, data }) => {
  const materials = data.materials
    ? filterData(data.materials, 'path', path)
    : null;

  return (
    <div>
      <div className="Materials">
        {isStudyPage(page) && materials
          ? CONSTANTS.UNI_YEARS.map((year, index) =>
              renderStudyMaterials(path, materials.docs, year, index)
            )
          : null}
        {isSciencePage(page) && materials
          ? renderScienceMaterials(path, materials.docs)
          : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.pages.data,
});

export default connect(mapStateToProps)(Materials);
