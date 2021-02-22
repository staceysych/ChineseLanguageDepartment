import React from 'react';

import { Button, Tooltip } from 'antd';
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
  contacts,
} = CONSTANTS.TABLE_COLUMNS_LABELS;

export const createColumns = (openModal) => [
  {
    title: () => <EditTwoTone twoToneColor="#a52423" />,
    dataIndex: '_id',
    key: '_id',
    render: (_id) => (
      <Tooltip placement="right" title="Изменить данные преподавателя" key={_id}>
        <Button
          type="dashed"
          size="small"
          icon={<EditTwoTone twoToneColor="#a52423" />}
          key={_id}
          onClick={() => openModal(_id)}
        />
      </Tooltip>
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
    render: (url) => <img key={url} className="TableView__img" src={url} />,
  },
  {
    title: position,
    dataIndex: 'position',
    key: 'position',
    render: (position) => <span key={position}>{EllipseText(position)}</span>,
  },
  {
    title: degree,
    dataIndex: 'degree',
    key: 'degree',
    render: (degree) => <span key={degree} >{EllipseText(degree)}</span>,
  },
  {
    title: subjects,
    dataIndex: 'subjects',
    key: 'subjects',
    render: (subjects) => (
      <p key={subjects} className="TableView__about custom-scroll">{subjects}</p>
    ),
  },
  {
    title: about,
    dataIndex: 'about',
    key: 'about',
    render: (about) => (
      <p key={about} className="TableView__about custom-scroll">{about}</p>
    ),
  },
  {
    title: publications,
    dataIndex: 'publications',
    key: 'publications',
    render: (publications) => (
      <>
        {publications.map((obj) => {
          return (
            <a
              className="TableView__publication"
              href={obj.url}
              key={obj.title}
              target="_blank"
            >
              {EllipseText(obj.title)}
            </a>
          );
        })}
      </>
    ),
  },
  {
    title: contacts,
    dataIndex: 'contacts',
    key: 'contacts',
    render: (contacts) => (
      <>
        {contacts &&
          Object.entries(contacts).map((item) => {
            return (
              <a
                className="TableView__contact"
                href={item[1]}
                key={item[0]}
                target="_blank"
              >
                {EllipseText(item[1])}
              </a>
            );
          })}
      </>
    ),
  },
];

export const columnStyle = { overflowX: 'auto', height: '85vh', width: '100vw' };
