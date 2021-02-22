import React from 'react';
import { Form, Input } from 'antd';

import { DocsList, layout } from './Modals.utils';
import { Line } from '../../utils';

import { CONSTANTS } from '../../constants';

import FileUpload from '../FileUpload';

const MaterialsForm = ({ onFinish, form }) => {
  const {
    sectionName,
    firstYear,
    secondYear,
    thirdYear,
    forthYear,
    fifthYear,
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
        label={<Line title="Materials" />}
        style={{ marginBottom: 0 }}
      >
        <DocsList />
      </Form.Item>
    </Form>
  );
};

export default MaterialsForm;
