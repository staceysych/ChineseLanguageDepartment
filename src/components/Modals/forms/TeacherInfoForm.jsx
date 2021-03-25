import React from 'react';

import { Form, Input } from 'antd';

import { PublicationsList, ContactsList, layout } from '../utils';
import { Line } from '../../../utils';

import { CONSTANTS } from '../../../constants';

import FileUpload from '../../FileUpload';

const TeacherInfoForm = ({
  onFinish,
  form,
  setFilesForUpload,
  displayCreateNew,
  filesForUpload,
}) => {
  const {
    name,
    photo,
    position,
    degree,
    subjects,
    about,
    publications,
    contacts,
  } = CONSTANTS.EDIT_MODAL_LABELS;
  const { NO_INFO } = CONSTANTS;
  const { isFieldTouched } = form;
  const isTouched = isFieldTouched();

  return (
    <Form layout={layout} onFinish={onFinish} form={form}>
      <Form.Item
        label={<Line title={name} />}
        name="name"
        rules={[{ required: true, type: 'string', message: 'Добавьте ФИО' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="photo" label={<Line title={photo} />}>
        <FileUpload
          {...{ NO_INFO, setFilesForUpload, filesForUpload, displayCreateNew }}
        />
      </Form.Item>
      <Form.Item name="position" label={<Line title={position} />}>
        <Input />
      </Form.Item>
      <Form.Item label={<Line title={degree} />} name="degree">
        <Input />
      </Form.Item>
      <Form.Item name="subjects" label={<Line title={subjects} />}>
        <Input.TextArea rows={3} />
      </Form.Item>
      <Form.Item name="about" label={<Line title={about} />}>
        <Input.TextArea rows={6} />
      </Form.Item>
      <Form.Item
        name="publications"
        label={<Line title={publications} />}
        style={{ marginBottom: 0 }}
      >
        <PublicationsList />
      </Form.Item>
      <Form.Item
        name="contacts"
        label={<Line title={contacts} />}
        style={{ marginBottom: 0 }}
      >
        <ContactsList isTouched={isTouched} />
      </Form.Item>
    </Form>
  );
};

export default TeacherInfoForm;
