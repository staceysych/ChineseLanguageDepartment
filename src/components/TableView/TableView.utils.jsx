import React from 'react';
import { connect } from 'react-redux';

import { Button } from 'antd';
import { EditTwoTone } from '@ant-design/icons';

import { EllipseText } from '../../utils';

const createColumns = (openModal) => [
  {
    title: () => <EditTwoTone twoToneColor="#a52423" />,
    dataIndex: '_id',
    key: '_id',
    render: (_id) => (
      <Button
        type="dashed"
        size="small"
        icon={<EditTwoTone twoToneColor="#a52423" />}
        key={_id}
        onClick={() => openModal(_id)}
      />
    ),
    align: 'center',
  },
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
    render: (about) => <p className="TableView__about">{about}</p>,
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

export default createColumns;
