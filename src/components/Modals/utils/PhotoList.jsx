import React from 'react';

import { Form, Space, Image } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';

import { CONSTANTS } from '../../../constants';

import FileUpload from '../../FileUpload';

export const PhotoList = ({
  setFilesForUpload,
  filesForUpload,
  form,
  isNewsPath,
  filesForDelete,
}) => {
  const { NO_INFO } = CONSTANTS;
  const photoArr = form.getFieldValue('photos');

  return (
    <Form.List name="photos">
      {(fields, { remove }) => (
        <div style={{ display: 'flex', flexWrap: 'no-wrap' }}>
          {fields.map((field) => (
            <Space
              key={field.key}
              style={{
                display: 'flex',
                justifyContent: 'start',
                marginRight: '5px',
              }}
              align="start"
            >
              <Form.Item
                {...field}
                name={[field.name, 'url']}
                fieldKey={[field.fieldKey, 'url']}
              >
                <Image
                  width={100}
                  height={100}
                  src={photoArr[field.name].url}
                />
              </Form.Item>

              <MinusCircleOutlined
                onClick={(e) => {
                  remove(field.name);
                  filesForDelete.push(field);
                  console.log(filesForDelete);
                }}
              />
            </Space>
          ))}

          <Form.Item>
            <FileUpload
              {...{
                setFilesForUpload,
                filesForUpload,
                NO_INFO,
                isNewsPath,
              }}
            />
          </Form.Item>
        </div>
      )}
    </Form.List>
  );
};
