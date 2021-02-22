import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Input, Button, Space } from 'antd';

import { ACTIONS } from '../../store/actions/creators';

import TeacherInfoForm from './TeacherInfoForm';
import MaterialsForm from './MaterialsForm';

import {
  formatInfoForModal,
  formatMaterialsForModal,
  formatInfoForServer,
  layout,
  defaultContacts,
} from './Modals.utils';
import {
  Line,
  useHttp,
  addNewPhoto,
  updatePhoto,
  deletePhoto,
} from '../../utils';

import { CONSTANTS, URLS } from '../../constants';

import './Modals.scss';

const EditModal = ({
  path,
  index,
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
  } = CONSTANTS.EDIT_MODAL_LABELS;
  const currentObject = data.teachers
    ? data.teachers.filter((obj) => obj._id === teacherIndex)
    : data.materials && data.materials.filter((obj) => obj._id === index);
  const [form] = Form.useForm();
  const { request } = useHttp();
  const [displayDeleteModal, setDeleteModal] = useState(false);
  const [fileForUpload, setFileForUpload] = useState('');

  useEffect(() => {
    if (isModalOpen && currentObject) {
      const formattedInfo =
        path === 'teachers'
          ? formatInfoForModal(currentObject[0])
          : formatMaterialsForModal(currentObject[0]);

          console.log(formattedInfo);
      form.setFieldsValue(formattedInfo);
    }
    if (displayCreateNew) {
      form.resetFields();
      form.setFieldsValue(defaultContacts);
    }
  }, [isModalOpen, displayCreateNew]);

  const closeModal = () => {
    setModalOpen(false);
    setDisplayCreateModal(false);
  };

  const onOk = () => {
    if (displayCreateNew) {
      if (fileForUpload) {
        form.submit();
        closeModal();
      } else {
        message(CONSTANTS.ADD_PHOTO_TEXT);
      }
    } else {
      form.submit();
      closeModal();
    }
  };

  const updateTeacherInfo = async (newObj) => {
    const formattedObj = formatInfoForServer(newObj);
    if (fileForUpload) {
      await deletePhoto(currentObject, token, request);
      await updatePhoto(
        fileForUpload,
        formattedObj,
        path,
        token,
        request,
        teacherIndex
      );
    } else {
      await request(
        `${URLS.SERVER_URL}${path}/${teacherIndex}`,
        'PUT',
        { ...formattedObj, _id: teacherIndex },
        token
      );
    }
  };

  const deleteTeacherInfo = async () => {
    await deletePhoto(currentObject, token);

    await request(
      `${URLS.SERVER_URL}${path}/${teacherIndex}`,
      'DELETE',
      {},
      token
    );
  };

  const addNewTeacher = (newObj) => {
    const formattedObj = formatInfoForServer(newObj);
    addNewPhoto(fileForUpload, formattedObj, path, token, request);
  };

  const handleDeleteTeacherClick = () => {
    deleteTeacherInfo();
    setDeleteModal(false);
    setModalOpen(false);
  };

  const onFinish = displayCreateNew ? addNewTeacher : updateTeacherInfo;

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
        {path === 'teachers' && (
          <TeacherInfoForm
            {...{
              onFinish,
              form,
              setFileForUpload,
              fileForUpload,
              displayCreateNew,
            }}
          />
        )}
        {path === 'study' && <MaterialsForm {...{ onFinish, form }} />}
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
  index: state.pages.index,
});

export default connect(mapStateToProps, { setModalOpen: ACTIONS.setModalOpen })(
  EditModal
);
