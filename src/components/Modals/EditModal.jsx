import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Input, Button, Space } from 'antd';

import { ACTIONS } from '../../store/actions/creators';

import {
  PublicationsList,
  ContactsList,
  formatInfoForModal,
  formatInfoForServer,
  layout,
} from './Modals.utils';
import { Line, useHttp, useMessage } from '../../utils';

import { CONSTANTS, URLS } from '../../constants';

import './Modals.scss';

const EditModal = ({
  path,
  userData: { token },
  data,
  isModalOpen,
  setModalOpen,
  teacherIndex,
}) => {
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
    contacts,
  } = CONSTANTS.EDIT_MODAL_LABELS;
  const currentObject = data.teachers.filter((obj) => obj._id === teacherIndex);
  const formattedInfo = formatInfoForModal(currentObject[0]);
  const [form] = Form.useForm();
  const message = useMessage();
  const { request, error, clearError } = useHttp();
  const [displayDeleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    form.setFieldsValue(formattedInfo);
  }, [isModalOpen]);

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const onOk = () => {
    form.submit();
    setModalOpen(false);
  };

  const updateTeacherInfo = async (newObj) => {
    const formattedObj = formatInfoForServer(newObj);
    const response = await request(
      `${URLS.SERVER_URL}${path}/${teacherIndex}`,
      'PUT',
      { ...formattedObj, _id: teacherIndex },
      { Authorization: `Bearer ${token}` }
    );
    message(response.message);
  };

  const deleteTeacherInfo = async () => {
    console.log(teacherIndex);
    const response = await request(
      `${URLS.SERVER_URL}${path}/${teacherIndex}`,
      'DELETE',
      { _id: teacherIndex },
      { Authorization: `Bearer ${token}` }
    );
    message(response.message);
  };

  const handleDeleteTeacherClick = () => {
    deleteTeacherInfo();
    setDeleteModal(false);
    setModalOpen(false);
  };

  return (
    <>
      <Modal
        title={title}
        visible={isModalOpen}
        onCancel={() => setModalOpen(false)}
        className="EditModal"
        footer={[
          <Space key="space" className="EditModal__delete">
            <Button
              key={deleteTeacher}
              onClick={() => setDeleteModal(true)}
              type="primary"
              danger
            >
              {deleteTeacher}
            </Button>
          </Space>,
          <Button key={cancel} onClick={() => setModalOpen(false)}>
            {cancel}
          </Button>,
          <Button key={save} type="primary" onClick={onOk}>
            {save}
          </Button>,
        ]}
      >
        <Form layout={layout} onFinish={updateTeacherInfo} form={form}>
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
            rules={[{ required: true, message: `Загрузите фотографию` }]}
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
          <Form.Item
            name="contacts"
            label={<Line title={contacts} />}
            style={{ marginBottom: 0 }}
          >
            <ContactsList />
          </Form.Item>
        </Form>
      </Modal>
      {displayDeleteModal && (
        <Modal
          visible={true}
          onCancel={() => setDeleteModal(false)}
          footer={[
            <Button danger  type="primary" onClick={handleDeleteTeacherClick}>
              {CONSTANTS.DELETE}
            </Button>
          ]}
        >
          <p>{CONSTANTS.DELETE_TEACHER_TEXT}</p>
        </Modal>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  data: state.pages.data,
  isModalOpen: state.pages.isModalOpen,
  teacherIndex: state.pages.teacherIndex,
  userData: state.pages.userData,
});

export default connect(mapStateToProps, { setModalOpen: ACTIONS.setModalOpen })(
  EditModal
);
