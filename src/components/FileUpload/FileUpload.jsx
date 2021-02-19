import React from 'react';
import { Upload, Button } from 'antd';
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
  };

  return (
    <Upload {...props}>
      <Button icon={<UploadOutlined />}>
        {displayCreateNew ? CONSTANTS.UPLOAD_PHOTO[0] : CONSTANTS.UPLOAD_PHOTO[1]}
      </Button>
    </Upload>
  );
};

export default FileUpload;
