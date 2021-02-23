import React from 'react';
import { Upload, Button, Tooltip } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import { CONSTANTS } from '../../constants';

const FileUpload = ({ setFileForUpload, fileForUpload, displayCreateNew }) => {
  const props = {
    onRemove: () => {
      setFileForUpload('');
    },
    beforeUpload: (file) => {
      setFileForUpload(file);
      return false;
    },
    fileForUpload,
    maxCount: 1,
  };

  const text = displayCreateNew
    ? CONSTANTS.UPLOAD_FILE[0]
    : CONSTANTS.UPLOAD_FILE[1];

  return (
    <Upload {...props}>
      <Tooltip placement="topLeft" title={text}>
        <Button icon={<UploadOutlined />} />
      </Tooltip>
    </Upload>
  );
};

export default FileUpload;
