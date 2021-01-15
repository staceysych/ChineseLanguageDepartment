import React from 'react';
import { Router } from '@reach/router';
import { connect } from 'react-redux';

import './MaterialsBoard.scss';

import { Hieroglyph } from '../../icons';
import { CONSTANTS } from '../../constants';

import Materials from './Materials';

const MaterialsBoard = ({path}) => {
  const noMaterialsElement = (
    <>
      <h4 className="MaterialsBoard__title">{CONSTANTS.NO_INFO_TEXT}</h4>
      <img src={Hieroglyph} alt="Hieroglyph" />
    </>
  );

  const isStudyPage = window.location.pathname === '/study';

  return (
    <div className="MaterialsBoard">
      {isStudyPage ? noMaterialsElement : null}
      <Router>
        <Materials path={path} />
      </Router>
    </div>
  );
};

const mapStateToProps = (state) => ({
  path: state.pages.path,
});

export default connect(mapStateToProps, null)(MaterialsBoard);
