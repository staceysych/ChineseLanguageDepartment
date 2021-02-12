import React from 'react';

import { Button } from 'antd';
import { EditTwoTone } from '@ant-design/icons';

import { EllipseText } from '../../utils';
import { CONSTANTS } from '../../constants';

const {
  name,
  photo,
  position,
  degree,
  subjects,
  about,
  publications,
  contacts
} = CONSTANTS.TABLE_COLUMNS_LABELS;

export const createColumns = (openModal) => [
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
    title: name,
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: photo,
    dataIndex: 'photo',
    key: 'photo',
    render: (url) => <img className="TableView__img" src={url} />,
  },
  {
    title: position,
    dataIndex: 'position',
    key: 'position',
  },
  {
    title: degree,
    dataIndex: 'degree',
    key: 'degree',
  },
  {
    title: subjects,
    dataIndex: 'subjects',
    key: 'subjects',
  },
  {
    title: about,
    dataIndex: 'about',
    key: 'about',
    render: (about) => <p className="TableView__about">{about}</p>,
  },
  {
    title: publications,
    dataIndex: 'publications',
    key: 'publications',
    render: (publications) => (
      <>
        {publications.map((obj) => {
          return (
            <a href={obj.url} key={obj.title} target="_blank">
              {EllipseText(obj.title)}
            </a>
          );
        })}
      </>
    ),
  },
];

export const columnStyle = { overflowX: 'auto', height: '85vh', width: '100%' };
