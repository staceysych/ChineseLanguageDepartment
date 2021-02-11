import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';

import { ACTIONS } from '../../store/actions/creators';

import './TableView.scss';

import createColumns from './TableView.utils';
import { EditModal } from '../Modals';

const TableView = ({ data, setModalOpen, setTeacherIndex, isModalOpen }) => {
  const openModal = (id) => {
    setModalOpen(true);
    setTeacherIndex(id);
  };
  const columns = createColumns(openModal);

  return (
    <div
      className="TableView"
      style={{ overflowX: 'auto', height: '85vh', width: '100%' }}
    >
      <Table columns={columns} dataSource={data.teachers} pagination={false} />
      {isModalOpen && <EditModal />}
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.pages.data,
  isModalOpen: state.pages.isModalOpen,
});

export default connect(mapStateToProps, {
  setModalOpen: ACTIONS.setModalOpen,
  setTeacherIndex: ACTIONS.setTeacherIndex,
})(TableView);
