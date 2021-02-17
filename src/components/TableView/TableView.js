import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Table, Tooltip, Button } from 'antd';

import { PlusOutlined } from '@ant-design/icons';

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
  const [displayCreateNew, setDisplayCreateModal] = useState(false);

  const openModal = (id) => {
    setModalOpen(true);
    setTeacherIndex(id);
  };
  const columns = createColumns(openModal);

  return (
    <div className="TableView custom-scroll" style={columnStyle}>
      <Table columns={columns} dataSource={data.teachers} pagination={false} />
      <Tooltip placement="left" title="Добавить нового преподавателя">
        <Button
          key="add"
          className="TableView__addBtn button"
          onClick={() => setDisplayCreateModal(true)}
        >
          {<PlusOutlined />}
        </Button>
      </Tooltip>
      {(isModalOpen || displayCreateNew) && (
        <EditModal
          path={path}
          displayCreateNew={displayCreateNew}
          setDisplayCreateModal={setDisplayCreateModal}
        />
      )}
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
