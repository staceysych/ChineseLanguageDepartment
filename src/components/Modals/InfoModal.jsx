import React from 'react';
import { connect } from 'react-redux';

import './Modals.scss';

import Button from '../Button';

import { ACTIONS } from '../../store/actions/creators';

const InfoModal = ({ isModalOpen, setModalOpen }) => {
  const closeModal = () => {
    setModalOpen(false);
  }

  return isModalOpen ? (
    <div className="Modal">
      <div className="Modal__layout">
        <div className="Modal__header">
          Modal
          <Button className="Modal__btn" text="Х" fn={closeModal} />
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
