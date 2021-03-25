import React from 'react';
import moment from 'moment';
import 'moment/locale/ru';
import locale from 'antd/es/date-picker/locale/ru_RU';

import { Form, Input, Space, Button, DatePicker } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import { CONSTANTS } from '../../../constants';
import { formStyle } from '../utils';

export const DocsScienceList = () => {
  const {
    addName,
    addNewMaterial,
    addPublished,
    place,
    url,
    author,
  } = CONSTANTS.TABLE_COLUMNS_LABELS_MATERIALS;

  return (
    <Form.List name="docs">
      {(fields, { add, remove }) => (
        <div>
          {fields.map((field) => (
            <Space key={field.key} style={formStyle} align="start">
              <Form.Item
                {...field}
                name={[field.name, 'name']}
                fieldKey={[field.fieldKey, 'name']}
                rules={[{ required: true, message: addName }]}
              >
                <Input.TextArea rows={3} cols={40} placeholder={addName} />
              </Form.Item>
              <Form.Item
                {...field}
                name={[field.name, 'author']}
                fieldKey={[field.fieldKey, 'author']}
              >
                <Input placeholder={author} />
              </Form.Item>
              <Form.Item
                {...field}
                name={[field.name, 'published']}
                fieldKey={[field.fieldKey, 'published']}
              >
                <Input.TextArea rows={3} cols={40} placeholder={addPublished} />
              </Form.Item>
              <Form.Item
                {...field}
                name={[field.name, 'place']}
                fieldKey={[field.fieldKey, 'place']}
                rules={[{ required: true, message: place }]}
              >
                <Input.TextArea rows={3} cols={20} placeholder={place} />
              </Form.Item>
              <Form.Item
                name={[field.name, 'date']}
                fieldKey={[field.fieldKey, 'date']}
              >
                <DatePicker format="DD-MM-YYYY" locale={locale} />
              </Form.Item>
              <Form.Item
                {...field}
                name={[field.name, 'url']}
                fieldKey={[field.fieldKey, 'url']}
              >
                <Input placeholder={url} />
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
              <PlusOutlined />
              {addNewMaterial}
            </Button>
          </Form.Item>
        </div>
      )}
    </Form.List>
  );
};
