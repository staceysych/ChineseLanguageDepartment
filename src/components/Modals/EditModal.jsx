import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Input, Button, Space } from 'antd';

import { ACTIONS } from '../../store/actions/creators';

import FileUpload from '../FileUpload';

import {
  PublicationsList,
  ContactsList,
  formatInfoForModal,
  formatInfoForServer,
  layout,
  defaultContacts,
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
  displayCreateNew,
  setDisplayCreateModal,
}) => {
  const {
    titleEdit,
    titleAdd,
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
  const [form] = Form.useForm();
  const message = useMessage();
  const { request, error, clearError } = useHttp();
  const [displayDeleteModal, setDeleteModal] = useState(false);
  const [fileForUpload, setFileForUpload] = useState('');

  useEffect(() => {
    if (isModalOpen && currentObject) {
      const formattedInfo = formatInfoForModal(currentObject[0]);
      form.setFieldsValue(formattedInfo);
    }
    if (displayCreateNew) {
      form.resetFields();
      form.setFieldsValue(defaultContacts);
    }
  }, [isModalOpen, displayCreateNew]);

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message]);

  const closeModal = () => {
    setModalOpen(false);
    setDisplayCreateModal(false);
  };

  const onOk = () => {
    form.submit();
    closeModal();
  };

  const updateTeacherInfo = async (newObj) => {
    const formattedObj = formatInfoForServer(newObj);
    if(fileForUpload) {
      await fetch(`http://localhost:4000/file/delete/${currentObject[0].photo.split('/')[currentObject[0].photo.split('/').length-1]}`, {
      method: 'DELETE',
    }).then(async ()=>{
      const img = new FormData();
      img.append('image', fileForUpload, fileForUpload.name);
      fetch('http://localhost:4000/file/upload', {
        method: 'POST',
        body: img,
      })
        .then((res) => res.json())
        .then((imgLocation) => {
          request(
            `http://localhost:4000/teachers/${teacherIndex}`,
            'PUT',
            { photo: imgLocation, ...formattedObj, _id: teacherIndex },
            { Authorization: `Bearer ${token}` }
          );
        })
        .catch(console.error);
    })
    } else {
      const response = await request(
        `${URLS.SERVER_URL}${path}/${teacherIndex}`,
        'PUT',
        { ...formattedObj, _id: teacherIndex },
        { 'Authorization': `Bearer ${token}` }
      );
      message(response.message);
    }
  };

  const deleteTeacherInfo = async () => {
    await fetch(`http://localhost:4000/file/delete/${currentObject[0].photo.split('/')[currentObject[0].photo.split('/').length-1]}`, {
      method: 'DELETE',
    }).then(async ()=>{
      const response = await request(
        `${URLS.SERVER_URL}${path}/${teacherIndex}`,
        'DELETE',
        {},
        { 'Authorization': `Bearer ${token}` }
      )
      message(response.message);
    })
  };

  const addNewTeacher = (newObj) => {
    const formattedObj = formatInfoForServer(newObj);
    console.log(formattedObj);
    const img = new FormData();

    if(fileForUpload) {
      img.append('image', fileForUpload, fileForUpload.name);
      fetch('http://localhost:4000/file/upload', {
        method: 'POST',
        body: img,
      })
        .then((res) => res.json())
        .then((imgLocation) => {
          request(
            'http://localhost:4000/teachers',
            'POST',
            { photo: imgLocation, ...formattedObj },
            { Authorization: `Bearer ${token}` }
          );
        })
        .catch(console.error);
    } else {
      // if file not selected throw error
      console.log('Please upload file', 'red');
    }
  }

  const handleDeleteTeacherClick = () => {
    deleteTeacherInfo();
    setDeleteModal(false);
    setModalOpen(false);
  };

  console.log(fileForUpload);

  return (
    <>
    <Modal
      title={displayCreateNew ? titleAdd : titleEdit}
      visible={isModalOpen || displayCreateNew}
      onCancel={closeModal}
      className="EditModal"
      footer={[
        <Space key="space" className="EditModal__delete">
            {!displayCreateNew && (
              <Button
                key={deleteTeacher}
                onClick={() => setDeleteModal(true)}
                type="primary"
                danger
              >
                {deleteTeacher}
              </Button>
            )}
          </Space>,
          <Button key={cancel} onClick={closeModal}>
            {cancel}
          </Button>,
          <Button key={save} type="primary" onClick={onOk}>
            {displayCreateNew ? add : save}
          </Button>,
        ]}
      >
        <Form layout={layout} onFinish={displayCreateNew ? addNewTeacher : updateTeacherInfo} form={form}>
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
          >
            <FileUpload form={form} setFileForUpload={setFileForUpload} fileForUpload={fileForUpload} />
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
            <Button
              key="delete"
              danger
              type="primary"
              onClick={handleDeleteTeacherClick}
            >
              {CONSTANTS.DELETE}
            </Button>,
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
  teacherIndex: state.pages.teacherIndex,
  isModalOpen: state.pages.isModalOpen,
  userData: state.pages.userData,
});

export default connect(mapStateToProps, { setModalOpen: ACTIONS.setModalOpen })(
  EditModal
);
