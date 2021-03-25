import React from 'react';

import { Button, Tooltip } from 'antd';
import { EditTwoTone } from '@ant-design/icons';

import { EllipseText, generateRandomId } from '../../../utils';
import { CONSTANTS } from '../../../constants';

const {
  name,
  photo,
  position,
  degree,
  subjects,
  about,
  publications,
  contacts,
  change_data,
} = CONSTANTS.TABLE_COLUMNS_LABELS_TEACHERS;

export const createColumnsTeachers = (openModal) => [
  {
    title: () => <EditTwoTone twoToneColor="#a52423" />,
    dataIndex: '_id',
    key: '_id',
    render: (_id) => (
      <Tooltip placement="right" title={change_data}>
        <Button
          type="dashed"
          size="small"
          icon={<EditTwoTone twoToneColor="#a52423" />}
          onClick={() => openModal(_id)}
        />
      </Tooltip>
    ),
    align: 'center',
  },
  {
    title: name,
    dataIndex: 'name',
    key: generateRandomId(),
  },
  {
    title: photo,
    dataIndex: 'photo',
    key: generateRandomId(),
    render: (url) => <img className="TableView__img" src={url} />,
  },
  {
    title: position,
    dataIndex: 'position',
    key: 'position',
    render: (position) => <span>{EllipseText(position)}</span>,
  },
  {
    title: degree,
    dataIndex: 'degree',
    key: generateRandomId(),
    render: (degree) => <span>{EllipseText(degree)}</span>,
  },
  {
    title: subjects,
    dataIndex: 'subjects',
    key: generateRandomId(),
    render: (subjects) => (
      <p className="TableView__about custom-scroll">{subjects}</p>
    ),
  },
  {
    title: about,
    dataIndex: 'about',
    key: generateRandomId(),
    render: (about) => (
      <p className="TableView__about custom-scroll">{about}</p>
    ),
  },
  {
    title: publications,
    dataIndex: 'publications',
    key: generateRandomId(),
    render: (publications) => (
      <>
        {publications.map((obj) => {
          return (
            <a
              className="TableView__publication"
              href={obj.url}
              key={generateRandomId()}
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
    key: generateRandomId(),
    render: (contacts) => (
      <>
        {contacts &&
          Object.entries(contacts).map((item) => {
            return (
              <a
                className="TableView__contact"
                href={item[1]}
                key={generateRandomId()}
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
