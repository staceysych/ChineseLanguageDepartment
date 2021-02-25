import React from 'react';

import { Button, Tooltip, Tag, Divider } from 'antd';
import { EditTwoTone } from '@ant-design/icons';

import { EllipseText, generateRandomId } from '../../utils';
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

const createColumnsTeachers = (openModal) => [
  {
    title: () => <EditTwoTone twoToneColor="#a52423" />,
    dataIndex: '_id',
    key: '_id',
    render: (_id) => (
      <Tooltip
        placement="right"
        title="Изменить данные преподавателя"
        key={generateRandomId()}
      >
        <Button
          type="dashed"
          size="small"
          icon={<EditTwoTone twoToneColor="#a52423" />}
          key={generateRandomId()}
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
    render: (url) => (
      <img key={generateRandomId()} className="TableView__img" src={url} />
    ),
  },
  {
    title: position,
    dataIndex: 'position',
    key: 'position',
    render: (position) => (
      <span key={generateRandomId()}>{EllipseText(position)}</span>
    ),
  },
  {
    title: degree,
    dataIndex: 'degree',
    key: generateRandomId(),
    render: (degree) => (
      <span key={generateRandomId()}>{EllipseText(degree)}</span>
    ),
  },
  {
    title: subjects,
    dataIndex: 'subjects',
    key: generateRandomId(),
    render: (subjects) => (
      <p key={generateRandomId()} className="TableView__about custom-scroll">
        {subjects}
      </p>
    ),
  },
  {
    title: about,
    dataIndex: 'about',
    key: generateRandomId(),
    render: (about) => (
      <p key={generateRandomId()} className="TableView__about custom-scroll">
        {about}
      </p>
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

const generateMaterial = (docs, year) => (
  <>
    {docs
      .filter((obj) => obj.year === year)
      .map((obj) => {
        return (
          <>
            <a
              className="TableView__link"
              href={obj.url}
              key={generateRandomId()}
              target="_blank"
            >
              {EllipseText(obj.name)}
            </a>
            {obj.specialization && (
              <Tag key={generateRandomId()} color="#f50">
                {obj.specialization}
              </Tag>
            )}
          </>
        );
      })}
  </>
);

const createColumnsStudyMaterials = (openModal) => [
  {
    title: () => <EditTwoTone twoToneColor="#a52423" />,
    dataIndex: '_id',
    key: generateRandomId(),
    render: (_id) => (
      <Tooltip
        placement="right"
        title="Изменить материалы"
        key={generateRandomId()}
      >
        <Button
          type="dashed"
          size="small"
          icon={<EditTwoTone twoToneColor="#a52423" />}
          key={generateRandomId()}
          onClick={() => openModal(_id)}
        />
      </Tooltip>
    ),
    align: 'center',
  },
  {
    title: sectionName,
    dataIndex: 'name',
    key: generateRandomId(),
    render: (name) => <span key={generateRandomId()}>{EllipseText(name)}</span>,
  },
  {
    title: firstYear,
    dataIndex: 'docs',
    key: generateRandomId(),
    render: (docs) => generateMaterial(docs, 1),
  },
  {
    title: secondYear,
    dataIndex: 'docs',
    key: generateRandomId(),
    render: (docs) => generateMaterial(docs, 2),
  },
  {
    title: thirdYear,
    dataIndex: 'docs',
    key: generateRandomId(),
    render: (docs) => generateMaterial(docs, 3),
  },
  {
    title: forthYear,
    dataIndex: 'docs',
    key: generateRandomId(),
    render: (docs) => generateMaterial(docs, 4),
  },
  {
    title: fifthYear,
    dataIndex: 'docs',
    key: generateRandomId(),
    render: (docs) => generateMaterial(docs, 5),
  },
];

const generateScienceMaterials = (docs) => (
  <>
    {docs.map((obj) => {
      return (
        <>
          <a
            className="TableView__link"
            href={obj.url}
            key={generateRandomId()}
            target="_blank"
          >
            {obj.name}
          </a>
          <Divider style={{ margin: '10px 0' }} />
        </>
      );
    })}
  </>
);

const createColumnsScienceMaterials = (openModal) => [
  {
    title: () => <EditTwoTone twoToneColor="#a52423" />,
    dataIndex: '_id',
    key: generateRandomId(),
    render: (_id) => (
      <Tooltip
        placement="right"
        title="Изменить материалы"
        key={generateRandomId()}
      >
        <Button
          type="dashed"
          size="small"
          icon={<EditTwoTone twoToneColor="#a52423" />}
          key={generateRandomId()}
          onClick={() => openModal(_id)}
        />
      </Tooltip>
    ),
    align: 'center',
  },
  {
    title: sectionName,
    dataIndex: 'name',
    key: generateRandomId(),
    render: (name) => <span key={generateRandomId()}>{EllipseText(name)}</span>,
  },
  {
    title: 'Материалы',
    dataIndex: 'docs',
    key: generateRandomId(),
    render: (docs) => generateScienceMaterials(docs),
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
    columns = createColumnsScienceMaterials(openModal);
  }

  return columns;
};

export const generateDataSource = (path, data) => {
  let dataSource;

  if (path === 'teachers') {
    dataSource = data.teachers;
  } else {
    dataSource = data.materials;
  }

  return dataSource;
};
