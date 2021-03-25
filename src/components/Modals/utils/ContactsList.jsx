import React from 'react';
import { Form, Input, Space } from 'antd';

import { CONSTANTS } from '../../../constants';
import { generateLabel } from './generate-label';
import { generateValidator } from './generate-validator';

export const ContactsList = () => {
  const { incorrectData } = CONSTANTS.CONTACTS_LABELS;

  return (
    <Form.List name="contacts">
      {(fields) => (
        <div>
          {fields.map((field) => {
            return (
              <Space
                key={field.key}
                style={{ display: 'flex', marginBottom: 8 }}
                align="start"
              >
                <Form.Item
                  {...field}
                  label={generateLabel(field.name)}
                  name={[field.name, 'contact']}
                  fieldKey={[field.fieldKey, 'contact']}
                  rules={[
                    {
                      required: false,
                      validator: (_, value) =>
                        generateValidator(value, field.name)
                          ? Promise.resolve()
                          : Promise.reject(incorrectData),
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Space>
            );
          })}
        </div>
      )}
    </Form.List>
  );
};
