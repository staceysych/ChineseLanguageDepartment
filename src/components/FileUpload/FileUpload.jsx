import React, { useState } from 'react';
import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const FileUpload = ({form, setFileForUpload, fileForUpload}) => {

  const props = {
    onRemove: () => {
      setFileForUpload('');
    },
    beforeUpload: (file) => {
      setFileForUpload(file);
      // form.setFieldsValue({photo: fileForUpload})
      return false;
    },
    fileForUpload,
  };

  return (
    <Upload {...props}>
      <Button icon={<UploadOutlined />}>Загрузить новое фото?</Button>
    </Upload>
  );
};

export default FileUpload;
