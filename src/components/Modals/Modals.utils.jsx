import React from 'react';
import { Form, Input, Space, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import { CONSTANTS } from '../../constants';
import {
  convertArrayToObject,
  validateEmail,
  validateMobile,
  validateWebsite,
  convertObjectToArray,
} from '../../utils';

export const formatInfoForModal = ({
  _id,
  name,
  photo,
  position,
  degree,
  subjects,
  about,
  publications,
  contacts,
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
  contacts:
    contacts && convertObjectToArray(contacts),
});

export const formatInfoForServer = ({
  _id,
  name,
  photo,
  position,
  degree,
  subjects,
  about,
  publications,
  contacts,
}) => ({
  _id,
  name,
  photo,
  position,
  degree,
  subjects,
  about,
  publications,
  contacts: convertArrayToObject(contacts),
});

export const PublicationsList = () => {
  const {
    title,
    titleMsg,
    published,
    publishedMsg,
    url,
    urlMsg,
    addPublication,
  } = CONSTANTS.PUBLICATIONS_LABELS;

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
                rules={[{ required: true, message: titleMsg }]}
              >
                <Input.TextArea rows={3} cols={40} placeholder={title} />
              </Form.Item>
              <Form.Item
                {...field}
                name={[field.name, 'published']}
                fieldKey={[field.fieldKey, 'published']}
                rules={[{ required: true, message: publishedMsg }]}
              >
                <Input.TextArea rows={3} cols={40} placeholder={published} />
              </Form.Item>
              <Form.Item
                {...field}
                name={[field.name, 'url']}
                fieldKey={[field.fieldKey, 'url']}
                rules={[{ required: true, message: urlMsg }]}
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
              {addPublication}
            </Button>
          </Form.Item>
        </div>
      )}
    </Form.List>
  );
};

export const ContactsList = () => {
  const { addContacts, contactsTitle, incorrectData } = CONSTANTS.CONTACTS_LABELS;

  return (
    <Form.List name="contacts">
      {(fields, { add, remove }) => (
        <div>
          {fields.map((field) => (
            <Space
              key={field.key}
              style={{ display: 'flex', marginBottom: 8 }}
              align="start"
            >
              <Form.Item
                {...field}
                name={[field.name, 'title']}
                fieldKey={[field.fieldKey, 'title']}
                rules={[
                  {
                    validator: (_, value) =>
                      value.match(/email|mobile|website/gm)
                        ? Promise.resolve()
                        : Promise.reject(incorrectData),
                  },
                ]}
              >
                <Input placeholder={contactsTitle} />
              </Form.Item>
              <Form.Item
                {...field}
                name={[field.name, 'contact']}
                fieldKey={[field.fieldKey, 'contact']}
                rules={[
                  {
                    validator: (_, value) =>
                      validateEmail(value) ||
                      validateMobile(value) ||
                      validateWebsite(value)
                        ? Promise.resolve()
                        : Promise.reject(incorrectData),
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <MinusCircleOutlined
                onClick={() => {
                  remove(field.name);
                }}
              />
            </Space>
          ))}

          {fields.length < 3 && (
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => {
                  add();
                }}
                block
              >
                <PlusOutlined />
                {addContacts}
              </Button>
            </Form.Item>
          )}
        </div>
      )}
    </Form.List>
  );
};

export const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};
