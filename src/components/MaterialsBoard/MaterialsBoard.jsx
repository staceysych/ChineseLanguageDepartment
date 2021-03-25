import React from 'react';
import { Router } from '@reach/router';
import { connect } from 'react-redux';

import './MaterialsBoard.scss';

import { Hieroglyph } from '../../icons';
import { CONSTANTS } from '../../constants';

import Materials from './Materials';

const MaterialsBoard = ({ path, page }) => {
  const noMaterialsElement = (
    <>
      <h4 className="MaterialsBoard__title">{CONSTANTS.NO_INFO_TEXT}</h4>
      <img src={Hieroglyph} alt="Hieroglyph" />
    </>
  );

  const isStudyPage = window.location.pathname === `/${CONSTANTS.STUDY_PAGE}`;
  const isSciencePage =
    window.location.pathname === `/${CONSTANTS.SCIENCE_PAGE}`;

  return (
    <>
      {(isStudyPage || isSciencePage) && noMaterialsElement}
      <Router>
        <Materials path={path} page={page} />
      </Router>
    </>
  );
};

const mapStateToProps = (state) => ({
  path: state.pages.path,
});

export default connect(mapStateToProps, null)(MaterialsBoard);
