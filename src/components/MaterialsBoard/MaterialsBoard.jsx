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

  const isStudyPage = window.location.pathname === '/study';
  const isSciencePage = window.location.pathname === '/science';

  return (
    <div className="MaterialsBoard custom-scroll">
      {isStudyPage || isSciencePage ? noMaterialsElement : null}
      <Router>
        <Materials path={path} page={page} />
      </Router>
    </div>
  );
};

const mapStateToProps = (state) => ({
  path: state.pages.path,
});

export default connect(mapStateToProps, null)(MaterialsBoard);
