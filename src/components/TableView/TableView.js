import React from 'react';
import { connect } from 'react-redux';
import { Link } from '@reach/router';
import { Table, Tooltip } from 'antd';

import './TableView.scss';

const EllipseText = (text) => (
  <Tooltip placement="topLeft" title={text}>
    <div
      style={{
        width: 200,
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
      }}
    >
      {text}
    </div>
  </Tooltip>
);

const TableView = ({ data }) => {
  console.log(data);
  const columns = [
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Фото',
      dataIndex: 'photo',
      key: 'photo',
      render: (url) => <img className="TableView__img" src={url} />,
    },
    {
      title: 'Должность',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: 'Ученая степень',
      dataIndex: 'degree',
      key: 'degree',
    },
    {
      title: 'Основные предметы',
      dataIndex: 'subjects',
      key: 'subjects',
    },
    {
      title: 'О преподавателе',
      dataIndex: 'about',
      key: 'about',
      render: (about) => EllipseText(about),
    },
    {
      title: 'Публикации',
      dataIndex: 'publications',
      key: 'publications',
      render: (publications) => (
        <>
          {publications.map((obj) => {
            return (
              <a href="https://ant.design/components/table/" key={obj.title}>
                {EllipseText(obj.title)}
              </a>
            );
          })}
        </>
      ),
    },
  ];

  return (
    <div
      className="TableView"
      style={{ overflowX: 'auto', height: '85vh', width: '100%' }}
    >
      <Table columns={columns} dataSource={data.teachers} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.pages.data,
});

export default connect(mapStateToProps, null)(TableView);
