import React from 'react';

import { Form, Input } from 'antd';

import {
  PublicationsList,
  ContactsList,
  layout,
} from './Modals.utils';
import {
  Line,
} from '../../utils';

import { CONSTANTS } from '../../constants';

import FileUpload from '../FileUpload';

const TeacherInfoForm = ({
  onFinish,
  form,
  setFileForUpload,
  fileForUpload,
  displayCreateNew,
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
  const a = ''

  return (
    <Form layout={layout} onFinish={onFinish} form={form}>
      <Form.Item
        label={<Line title={name} />}
        name="name"
        rules={[{ required: true, type: 'string' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="photo"
        label={<Line title={photo} />}
        rules={[{ required: true, type: 'image' }]}
      >
        <FileUpload
          {...{ a, setFileForUpload, fileForUpload, displayCreateNew }}
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
        <ContactsList />
      </Form.Item>
    </Form>
  );
};

export default TeacherInfoForm;
