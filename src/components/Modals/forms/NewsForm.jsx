import React from 'react';
import 'moment/locale/ru';
import locale from 'antd/es/date-picker/locale/ru_RU';

import { Form, Input, DatePicker } from 'antd';

import { layout, PhotoList } from '../utils';
import { Line } from '../../../utils';

const NewsForm = ({
  onFinishNews,
  form,
  setFilesForUpload,
  filesForUpload,
  isNewsPath,
  filesForDelete
}) => {
  return (
    <Form layout={layout} onFinish={onFinishNews} form={form}>
      <Form.Item
        label={<Line title="Название" />}
        name="title"
        rules={[{ required: true, type: 'string', message: 'Добавьте название' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="date"
        label={<Line title="Дата" />}
        rules={[{ required: true, message: 'Введите дату' }]}
      >
        <DatePicker format="DD-MM-YYYY" locale={locale} />
      </Form.Item>
      <Form.Item
        name="description"
        label={<Line title="Краткое описание" />}
        rules={[{ required: true, message: 'Введите краткое описание' }]}
      >
        <Input.TextArea rows={3} />
      </Form.Item>
      <Form.Item
        name="article"
        label={<Line title="Текст новости" />}
        rules={[{ required: true, message: 'Введите текст новости' }]}
      >
        <Input.TextArea rows={6} />
      </Form.Item>
      <Form.Item
        name="photos"
        label={<Line title="Фотографии" />}
        style={{ marginBottom: 0 }}
      >
        <PhotoList
          {...{
            setFilesForUpload,
            filesForUpload,
            form,
            isNewsPath,
            filesForDelete
          }}
        />
      </Form.Item>
    </Form>
  );
};

export default NewsForm;
