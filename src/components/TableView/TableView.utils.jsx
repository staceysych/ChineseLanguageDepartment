import React from 'react';

import { Button, Tooltip, Tag } from 'antd';
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
} = CONSTANTS.TABLE_COLUMNS_LABELS_TEACHERS;
const {
  sectionName,
  firstYear,
  secondYear,
  thirdYear,
  forthYear,
  fifthYear,
} = CONSTANTS.TABLE_COLUMNS_LABELS_MATERIALS;

export const createColumnsTeachers = (openModal) => [
  {
    title: () => <EditTwoTone twoToneColor="#a52423" />,
    dataIndex: '_id',
    key: '_id',
    render: (_id) => (
      <Tooltip
        placement="right"
        title="Изменить данные преподавателя"
        key={_id}
      >
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
    render: (degree) => <span key={degree}>{EllipseText(degree)}</span>,
  },
  {
    title: subjects,
    dataIndex: 'subjects',
    key: 'subjects',
    render: (subjects) => (
      <p key={subjects} className="TableView__about custom-scroll">
        {subjects}
      </p>
    ),
  },
  {
    title: about,
    dataIndex: 'about',
    key: 'about',
    render: (about) => (
      <p key={about} className="TableView__about custom-scroll">
        {about}
      </p>
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

const generateMaterial = (docs, year) => (
  <>
    {docs
      .filter((obj) => obj.year === year)
      .map((obj) => {
        return (
          <>
            <a
              className="TableView__link"
              href={obj.urls.main}
              key={obj._id}
              target="_blank"
            >
              {EllipseText(obj.name)}
            </a>
            {obj.specialization && <Tag color="#f50">{obj.specialization}</Tag>}
          </>
        );
      })}
  </>
);

export const createColumnsStudyMaterials = (openModal) => [
  {
    title: () => <EditTwoTone twoToneColor="#a52423" />,
    dataIndex: '_id',
    key: '_id',
    render: (_id) => (
      <Tooltip placement="right" title="Изменить материалы" key={_id}>
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
    title: sectionName,
    dataIndex: 'name',
    key: 'name',
    render: (name) => <span>{EllipseText(name)}</span>,
  },
  {
    title: firstYear,
    dataIndex: 'docs',
    key: 'docs',
    render: (docs) => generateMaterial(docs, 1),
  },
  {
    title: secondYear,
    dataIndex: 'docs',
    key: 'docs',
    render: (docs) => generateMaterial(docs, 2),
  },
  {
    title: thirdYear,
    dataIndex: 'docs',
    key: 'docs',
    render: (docs) => generateMaterial(docs, 3),
  },
  {
    title: forthYear,
    dataIndex: 'docs',
    key: 'docs',
    render: (docs) => generateMaterial(docs, 4),
  },
  {
    title: fifthYear,
    dataIndex: 'docs',
    key: 'docs',
    render: (docs) => generateMaterial(docs, 5),
  },
];

export const columnStyle = {
  overflowX: 'auto',
  height: '85vh',
  width: '100vw',
};

export const generateColumns = (path, openModal) => {
  let columns;

  if (path === 'teachers') {
    columns = createColumnsTeachers(openModal);
  } else if (path === 'study') {
    columns = createColumnsStudyMaterials(openModal);
  } else {
    columns = '';
  }

  return columns;
};
export const generateDataSource = (path, data) => {
  let dataSource;

  if (path === 'teachers') {
    dataSource = data.teachers;
  } else if (path === 'study') {
    dataSource = data.materials;
  } else {
    dataSource = '';
  }

  return dataSource;
};
