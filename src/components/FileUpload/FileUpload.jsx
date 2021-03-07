import React from 'react';
import { Upload, Button, Tooltip } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import { CONSTANTS } from '../../constants';

const FileUpload = ({
  id,
  setFilesForUpload,
  filesForUpload,
  displayCreateNew,
  setIdForUpload,
  isNewsPath,
}) => {
  const props = {
    onRemove: () => {
      setFilesForUpload([]);
/*       setIdForUpload(0); */
    },
    beforeUpload: (file, e) => {
/*       setIdForUpload(id); */
        filesForUpload.push(file)
      return false;
    },
    filesForUpload,
    maxCount: isNewsPath ? 4 : 1,
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
