import React from 'react';
import { Form, Input, Space, Button, Select } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import { CONSTANTS } from '../../../constants';
import { formStyle } from '../utils';

import FileUpload from '../../FileUpload';

export const DocsList = ({
  setFilesForUpload,
  filesForUpload,
  path,
  filesForDelete,
}) => {
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
  const { NO_INFO } = CONSTANTS;

  return (
    <Form.List name="docs">
      {(fields, { add, remove }) => (
        <div>
          {fields.map((field, id) => (
            <Space key={field.key} style={formStyle} align="start">
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
                <FileUpload
                  {...{
                    setFilesForUpload,
                    filesForUpload,
                    NO_INFO,
                    field,
                    path,
                  }}
                />
              </Form.Item>

              <MinusCircleOutlined
                onClick={() => {
                  remove(field.name);
                  filesForDelete.push(field.key);
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
