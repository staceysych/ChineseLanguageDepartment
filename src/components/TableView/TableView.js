import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';

import { ACTIONS } from '../../store/actions/creators';

import './TableView.scss';

import { createColumns, columnStyle } from './TableView.utils';

import { EditModal } from '../Modals';

const TableView = ({
  path,
  data,
  setModalOpen,
  setTeacherIndex,
  isModalOpen,
}) => {
  const openModal = (id) => {
    setModalOpen(true);
    setTeacherIndex(id);
  };
  const columns = createColumns(openModal);

  return (
    <div
      className="TableView"
      style={columnStyle}
    >
      <Table columns={columns} dataSource={data.teachers} pagination={false} />
      {isModalOpen && <EditModal path={path} />}
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
