import React from 'react';
import moment from 'moment';
import 'moment/locale/ru';
import locale from 'antd/es/date-picker/locale/ru_RU';
import { Form, Input, Space, Button, Select, DatePicker } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import { CONSTANTS } from '../../constants';
import {
  convertArrayToObject,
  validateEmail,
  validateMobile,
  validateWebsite,
  convertObjectToArray,
  getTimeStamp,
} from '../../utils';


import FileUpload from '../FileUpload';

const formStyle = {
  display: 'flex',
  marginBottom: 8,
  justifyContent: 'space-evenly',
  minWidth: '500px',
}

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
  contacts: contacts && convertObjectToArray(contacts),
});

export const formatMaterialsForModal = ({ _id, name, docs }, path) => {
  if (path === 'study') {
    return {
      _id,
      name,
      docs: docs
        .sort((a, b) => a.year - b.year)
        .map((obj) => ({
          year: obj.year,
          name: obj.name,
          specialization: obj.specialization,
          url: obj.url,
        })),
    };
  } else {
    return {
      _id,
      name,
      docs: docs.map((obj) => ({
        date: obj.date && moment(obj.date * 1000),
        name: obj.name,
        published: obj.published,
        url: obj.url,
        author: obj.author,
        place: obj.place,
      })),
    };
  }
};

export const formatTeachersInfoForServer = ({
  name,
  position,
  degree,
  subjects,
  about,
  publications,
  contacts,
}) => ({
  name,
  position,
  degree,
  subjects,
  about,
  publications,
  contacts: convertArrayToObject(contacts),
});

export const formatMaterialsForServer = (obj, path) => {
  if(path === 'study') {
    console.log(obj);
    return {
      name: obj.name,
      docs: obj.docs
    }
  } else {
    return {
      name: obj.name,
      docs: obj.docs.map((item) => ({
        date: `${getTimeStamp(item.date)}`,
        name: item.name,
        published: item.published,
        url: item.url,
        author: item.author,
        place: item.place,
      })),
    }
  }
};

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
              style={formStyle}
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

const generateValidator = (value, name) => {
  switch (name) {
    case 0:
      return validateEmail(value);
    case 1:
      return validateMobile(value);
    default:
      return validateWebsite(value);
  }
};

const generateLabel = (name) => {
  switch (name) {
    case 0:
      return 'Email';
    case 1:
      return 'Mobile';
    default:
      return 'Website';
  }
};

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

export const DocsList = ({ setFileForUpload, fileForUpload }) => {
  const { Option } = Select;
  const {
    firstYear,
    secondYear,
    thirdYear,
    forthYear,
    fifthYear,
    addYear,
    addName,
    addSpecialization,
    specializations,
    addNewMaterial,
  } = CONSTANTS.TABLE_COLUMNS_LABELS_MATERIALS;

  return (
    <Form.List name="docs">
      {(fields, { add, remove }) => (
        <div>
          {fields.map((field) => (
            <Space
              key={field.key}
              style={formStyle}
              align="start"
            >
              <Form.Item
                {...field}
                name={[field.name, 'year']}
                fieldKey={[field.fieldKey, 'year']}
                rules={[{ required: true, message: addYear }]}
              >
                <Select placeholder={addYear}>
                  <Option value={1}>{firstYear}</Option>
                  <Option value={2}>{secondYear}</Option>
                  <Option value={3}>{thirdYear}</Option>
                  <Option value={4}>{forthYear}</Option>
                  <Option value={5}>{fifthYear}</Option>
                </Select>
              </Form.Item>
              <Form.Item
                {...field}
                name={[field.name, 'name']}
                fieldKey={[field.fieldKey, 'name']}
                rules={[{ required: true, message: addName }]}
              >
                <Input placeholder={addName} />
              </Form.Item>
              <Form.Item
                {...field}
                name={[field.name, 'specialization']}
                fieldKey={[field.fieldKey, 'specialization']}
                rules={[{ required: true, message: addSpecialization }]}
              >
                <Select placeholder={addSpecialization}>
                  <Option value={specializations[0]}>
                    {specializations[0]}
                  </Option>
                  <Option value={specializations[1]}>
                    {specializations[1]}
                  </Option>
                  <Option value={specializations[2]}>
                    {specializations[2]}
                  </Option>
                </Select>
              </Form.Item>
              <Form.Item
                {...field}
                name="url"
                fieldKey={[field.fieldKey, 'url']}
              >
                <FileUpload {...{ setFileForUpload, fileForUpload }} />
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

export const DocsScienceList = () => {
  const {
    addName,
    addNewMaterial,
    addPublished,
    place,
    date,
    url
  } = CONSTANTS.TABLE_COLUMNS_LABELS_MATERIALS;

  return (
    <Form.List name="docs">
      {(fields, { add, remove }) => (
        <div>
          {fields.map((field) => (
            <Space
              key={field.key}
              style={formStyle}
              align="start"
            >
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

export const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

export const defaultContacts = {
  contacts: [
    { title: 'email', contact: '' },
    { title: 'mobile', contact: '' },
    { title: 'website', contact: '' },
  ],
};
