import React from 'react';

import { Button, Tooltip } from 'antd';
import { EditTwoTone } from '@ant-design/icons';

import { EllipseText, generateRandomId, getFormattedDate } from '../../../utils';

import { generateNewsPhotos } from './generate-news-photos';


export const createColumnsNews = (openModal) => [
  {
    title: () => <EditTwoTone twoToneColor="#a52423" />,
    dataIndex: '_id',
    key: generateRandomId(),
    render: (_id) => (
      <Tooltip placement="right" title="Изменить новость">
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
    title: 'Обложка',
    dataIndex: 'photos',
    key: generateRandomId(),
    render: (photos) => generateNewsPhotos(photos, true),
  },
  {
    title: 'Название',
    dataIndex: 'title',
    key: generateRandomId(),
  },
  {
    title: 'Дата',
    dataIndex: 'date',
    key: generateRandomId(),
    render: (date) => <span>{getFormattedDate(date)}</span>,
  },
  {
    title: 'Краткое описание',
    dataIndex: 'description',
    key: generateRandomId(),
    render: (description) => <span>{EllipseText(description)}</span>,
  },
  {
    title: 'Текст новости',
    dataIndex: 'article',
    key: generateRandomId(),
    render: (article) => (
      <p className="TableView__about custom-scroll">{article}</p>
    ),
  },
  {
    title: 'Фотографии',
    dataIndex: 'photos',
    key: generateRandomId(),
    render: (photos) => generateNewsPhotos(photos),
  },
];
