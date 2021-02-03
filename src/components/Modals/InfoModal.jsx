import React from 'react';
import { connect } from 'react-redux';

import './Modals.scss';

import Button from '../Button';

import { ACTIONS } from '../../store/actions/creators';

const InfoModal = ({ isModalOpen, setModalOpen, index, data }) => {
  const closeModal = () => {
    setModalOpen(false);
  }
  console.log(index);
  return isModalOpen ? (
    <div className="Modal">
      <div className="Modal__layout">
        <div className="Modal__header">
          {/* Modal + {data.teachers[index].name} */}
          <Button className="Modal__btn" text="Х" fn={closeModal} />
        </div>
      </div>
    </div>
  ) : null;
};

const mapStateToProps = (state) => ({
  data: state.pages.data,
  isModalOpen: state.pages.isModalOpen,
  index: state.pages.index,
});

export default connect(mapStateToProps, {
  setModalOpen: ACTIONS.setModalOpen,
})(InfoModal);
