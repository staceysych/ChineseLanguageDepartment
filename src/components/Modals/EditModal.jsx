import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Input, Button, Space } from 'antd';

import { ACTIONS } from '../../store/actions/creators';

import { PublicationsList, formatInfoForModal } from './Modals.utils';
import { Line } from '../../utils';
import { CONSTANTS } from '../../constants';

import './Modals.scss';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

const EditModal = ({ data, isModalOpen, setModalOpen, teacherIndex }) => {
  const {
    title,
    deleteTeacher,
    cancel,
    save,
    add,
    name,
    photo,
    position,
    degree,
    subjects,
    about,
    publications,
  } = CONSTANTS.EDIT_MODAL_LABELS;
  const currentObject = data.teachers.filter((obj) => obj._id === teacherIndex);
  const formattedInfo = formatInfoForModal(currentObject[0]);
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(formattedInfo);
  }, [isModalOpen]);

  return (
    <Modal
      title={title}
      visible={isModalOpen}
      onCancel={() => setModalOpen(false)}
      className="EditModal"
      footer={[
        <Space key="space" className="EditModal__delete">
          <Button
            key={deleteTeacher}
            // onClick={() => onDelete(selectedEvent.id)}
            type="primary"
            danger
          >
            {deleteTeacher}
          </Button>
        </Space>,
        <Button key={cancel} onClick={() => setModalOpen(false)}>
          {cancel}
        </Button>,
        <Button key={save} type="primary">
          {save}
        </Button>,
      ]}
    >
      <Form
        layout={layout}
        // onFinish={createNewEvent || updateEvent}
        form={form}
      >
        <Form.Item
          label={<Line title={name} />}
          name="name"
          rules={[{ required: true, type: 'string', min: 0, max: 99 }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="photo"
          label={<Line title={photo} />}
          rules={[{ required: true, message: `` }]}
        >
          <Input />
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
      </Form>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  data: state.pages.data,
  isModalOpen: state.pages.isModalOpen,
  teacherIndex: state.pages.teacherIndex,
});

export default connect(mapStateToProps, { setModalOpen: ACTIONS.setModalOpen })(
  EditModal
);
