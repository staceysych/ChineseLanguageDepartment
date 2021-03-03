import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Table, Tooltip, Button } from 'antd';

import { PlusOutlined } from '@ant-design/icons';

import { ACTIONS } from '../../store/actions/creators';
import { CONSTANTS } from '../../constants';

import './TableView.scss';

import {
  generateColumns,
  columnStyle,
  generateDataSource,
} from './TableView.utils';

import { EditModal } from '../Modals';

const TableView = ({
  path,
  data,
  setModalOpen,
  setTeacherIndex,
  isModalOpen,
}) => {
  const { ADD_TEACHER_TEXT, ADD_NEWS_TEXT } = CONSTANTS;
  const [displayCreateNew, setDisplayCreateModal] = useState(false);
  const isTeacherPath = path === 'teachers';
  const isNewsPath = path === 'news';

  const openModal = (id) => {
    setModalOpen(true, id);
    setTeacherIndex(id);
  };
  const columns = generateColumns(path, openModal);
  const dataSource = generateDataSource(path, data);

  return (
    <div
      className="TableView custom-scroll"
      key={Math.random() * 100}
      style={columnStyle}
    >
      <Table columns={columns} dataSource={dataSource} pagination={false} />
      {(isTeacherPath || isNewsPath) && (
        <Tooltip
          placement="left"
          title={isTeacherPath ? ADD_TEACHER_TEXT : ADD_NEWS_TEXT}
        >
          <Button
            key={Math.random() * 100}
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
