import React from 'react';
import { Form, Input } from 'antd';

import { DocsList, layout } from './Modals.utils';
import { Line } from '../../utils';

import { CONSTANTS } from '../../constants';

const MaterialsForm = ({ onFinish, form, setFileForUpload, fileForUpload }) => {
  const {
    sectionName,
    materialsName
  } = CONSTANTS.TABLE_COLUMNS_LABELS_MATERIALS;

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
        style={{ marginBottom: 0, overflow: 'auto', }}
      >
        <DocsList {...{ setFileForUpload, fileForUpload }} />
      </Form.Item>
    </Form>
  );
};

export default MaterialsForm;
