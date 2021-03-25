import React from 'react';
import { Form, Input } from 'antd';

import { DocsList, layout, DocsScienceList } from '../utils';
import { Line } from '../../../utils';

import { CONSTANTS } from '../../../constants';

const MaterialsForm = ({
  onFinish,
  form,
  setFileForUpload,
  filesForUpload,
  path,
  filesForDelete,
  setFilesForDelete,
  SFFD,
  FFDS,
}) => {
  const {
    sectionName,
    materialsName,
  } = CONSTANTS.TABLE_COLUMNS_LABELS_MATERIALS;
  const isStudyMaterials = path === CONSTANTS.STUDY_PAGE;

  return (
    <Form layout={layout} onFinish={onFinish} form={form}>
      <Form.Item
        label={<Line title={sectionName} />}
        name="name"
        rules={[{ required: true, type: 'string' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="docs"
        label={<Line title={materialsName} />}
        style={{ marginBottom: 0, overflow: 'auto' }}
      >
        {isStudyMaterials ? (
          <DocsList
            {...{
              setFileForUpload,
              filesForUpload,
              path,
              filesForDelete,
              setFilesForDelete,
              SFFD,
              FFDS,
            }}
          />
        ) : (
          <DocsScienceList />
        )}
      </Form.Item>
    </Form>
  );
};

export default MaterialsForm;
