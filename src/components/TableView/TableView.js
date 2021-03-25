import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Table, Tooltip, Button } from 'antd';

import { PlusOutlined } from '@ant-design/icons';

import { ACTIONS } from '../../store/actions/creators';
import { CONSTANTS } from '../../constants';
import { generateRandomId } from '../../utils';

import './TableView.scss';

import {
  generateColumns,
  columnStyle,
  generateDataSource,
} from './utils';

import { EditModal } from '../Modals';

const TableView = ({
  path,
  data,
  setModalOpen,
  setTeacherIndex,
  isModalOpen,
}) => {
  const {
    ADD_TEACHER_TEXT,
    ADD_NEWS_TEXT,
    TEACHERS_PAGE,
    NEWS_PAGE,
  } = CONSTANTS;
  const [displayCreateNew, setDisplayCreateModal] = useState(false);
  const isTeacherPath = path === TEACHERS_PAGE;
  const isNewsPath = path === NEWS_PAGE;

  const openModal = (id) => {
    setModalOpen(true, id);
    setTeacherIndex(id);
  };
  const columns = generateColumns(path, openModal);
  const dataSource = generateDataSource(path, data);

  return (
    <div className="TableView custom-scroll" style={columnStyle}>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        rowKey={() => generateRandomId()}
      />
      {(isTeacherPath || isNewsPath) && (
        <Tooltip
          placement="left"
          title={isTeacherPath ? ADD_TEACHER_TEXT : ADD_NEWS_TEXT}
        >
          <Button
            className="TableView__addBtn button"
            onClick={() => setDisplayCreateModal(true)}
          >
            {<PlusOutlined />}
          </Button>
        </Tooltip>
      )}
      {(isModalOpen || displayCreateNew) && (
        <EditModal
          {...{
            path,
            displayCreateNew,
            setDisplayCreateModal,
          }}
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
