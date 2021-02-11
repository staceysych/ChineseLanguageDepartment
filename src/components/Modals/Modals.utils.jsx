import React from 'react';
import { Form, Input, Space, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

export const PublicationsList = () => {
  return (
    <Form.List name="publications">
      {(fields, { add, remove }) => (
        <div>
          {fields.map((field) => (
            <Space
              key={field.key}
              style={{
                display: 'flex',
                marginBottom: 8,
                justifyContent: 'space-evenly',
              }}
              align="start"
            >
              <Form.Item
                {...field}
                name={[field.name, 'title']}
                fieldKey={[field.fieldKey, 'title']}
                rules={[{ required: true, message: 'Введите название' }]}
              >
                <Input.TextArea rows={3} cols={40} placeholder="Название" />
              </Form.Item>
              <Form.Item
                {...field}
                name={[field.name, 'published']}
                fieldKey={[field.fieldKey, 'published']}
                rules={[
                  { required: true, message: 'Введите место и год публикации' },
                ]}
              >
                <Input.TextArea rows={3} cols={40} placeholder="Опубликовано" />
              </Form.Item>
              <Form.Item
                {...field}
                name={[field.name, 'url']}
                fieldKey={[field.fieldKey, 'url']}
                rules={[
                  { required: true, message: 'Введите ссылку на статью' },
                ]}
              >
                <Input placeholder="Ссылка" />
              </Form.Item>

              <MinusCircleOutlined
                onClick={() => {
                  remove(field.name);
                }}
              />
            </Space>
          ))}

          <Form.Item>
            <Button
              type="dashed"
              onClick={() => {
                add();
              }}
              block
            >
              <PlusOutlined /> Добавить публикацию
            </Button>
          </Form.Item>
        </div>
      )}
    </Form.List>
  );
};

export const formatInfoForModal = ({
  _id,
  name,
  photo,
  position,
  degree,
  subjects,
  about,
  publications,
}) => ({
  _id,
  name,
  photo,
  position,
  degree,
  subjects,
  about,
  publications: publications.map((obj) => ({
    title: obj.title,
    published: obj.published,
    url: obj.url,
  })),
});
