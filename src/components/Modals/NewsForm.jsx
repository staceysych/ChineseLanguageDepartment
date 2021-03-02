import React from 'react';
import 'moment/locale/ru';
import locale from 'antd/es/date-picker/locale/ru_RU';

import { Form, Input, DatePicker } from 'antd';

import { layout, PhotoList } from './Modals.utils';
import { Line } from '../../utils';

import { CONSTANTS } from '../../constants';

import FileUpload from '../FileUpload';

const NewsForm = ({
  onFinishNews,
  form,
  setFileForUpload,
  fileForUpload,
  displayCreateNew,
  setIdForUpload,
}) => {
  const { NO_INFO } = CONSTANTS;
  return (
    <Form layout={layout} onFinish={onFinishNews} form={form}>
      <Form.Item
        label={<Line title="Название" />}
        name="title"
        rules={[{ required: true, type: 'string', message: 'Добавьте ФИО' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="coverPhoto" label={<Line title="Обложка" />}>
        <FileUpload
          {...{ NO_INFO, setFileForUpload, fileForUpload, displayCreateNew }}
        />
      </Form.Item>
      <Form.Item name="date" label={<Line title="Дата" />}>
        <DatePicker format="DD-MM-YYYY" locale={locale} />
      </Form.Item>
      <Form.Item name="description" label={<Line title="Краткое описание" />}>
        <Input.TextArea rows={3} />
      </Form.Item>
      <Form.Item name="article" label={<Line title="Текст новости" />}>
        <Input.TextArea rows={6} />
      </Form.Item>
      <Form.Item
        name="photos"
        label={<Line title="Фотографии" />}
        style={{ marginBottom: 0 }}
      >
        <PhotoList {...{ setFileForUpload, fileForUpload, setIdForUpload, form }} />
      </Form.Item>
    </Form>
  );
};

export default NewsForm;
