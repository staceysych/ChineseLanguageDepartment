import React from 'react';
import { connect } from 'react-redux';

import './InfoModal.scss';

import Button from '../Button';

import { ACTIONS } from '../../store/actions/creators';

const InfoModal = ({ isModalOpen, setModalOpen }) => {
  const closeModal = () => {
    setModalOpen(false);
  }

  return isModalOpen ? (
    <div className="InfoModal">
      <div className="InfoModal__layout">
        <div className="InfoModal__header">
          Modal
          <Button className="InfoModal__btn" text="Х" fn={closeModal} />
        </div>
      </div>
    </div>
  ) : null;
};

const mapStateToProps = (state) => ({
  isModalOpen: state.pages.isModalOpen,
});

export default connect(mapStateToProps, {
  setModalOpen: ACTIONS.setModalOpen,
})(InfoModal);
