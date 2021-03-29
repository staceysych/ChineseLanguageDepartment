import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Button, Space } from 'antd';

import { ACTIONS } from '../../store/actions/creators';

import { TeacherInfoForm, MaterialsForm, NewsForm } from './forms';

import {
  getCurrentObj,
  formatObjForModal,
  formatTeachersInfoForServer,
  formatMaterialsForServer,
  formatNewsForServer,
  defaultContacts,
} from './utils';

import {
  useMessage,
  useHttp,
  addNewPhoto,
  updatePhoto,
  deletePhoto,
  updateFile,
  deleteFile,
  deleteManyPhotos,
  deleteNewsInfo,
  multiplePhotoUploadHandler,
  updateNews,
  updateTeacherInfo,
  deleteTeacherInfo,
  addNewTeacher,
  addNewNews,
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
    titleAddTeacher,
    titleAddNews,
    deleteTeacher,
    deleteNews,
    cancel,
    save,
    add,
  } = CONSTANTS.EDIT_MODAL_LABELS;
  const currentObject = getCurrentObj(path, data).filter(
    (obj) => obj._id === index
  );
  const message = useMessage();
  const [form] = Form.useForm();
  const { request } = useHttp();
  const [displayDeleteModal, setDeleteModal] = useState(false);
  const [filesForUpload, setFilesForUpload] = useState([]);
  const [filesForDelete, setFilesForDelete] = useState([]);
  const modalTitle = displayCreateNew ? titleAddTeacher : titleEdit;
  const isTeacherPath = path === 'teachers';
  const isMaterialsPath = path === 'study' || path === 'science';
  const isNewsPath = path === 'news';

  useEffect(() => {
    if (isModalOpen && currentObject) {
      const formattedInfo = formatObjForModal(path, currentObject[0]);
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
      if (filesForUpload[0]) {
        form.submit();
      } else {
        message(CONSTANTS.ADD_PHOTO_TEXT);
      }
    } else {
      form.submit();
    }
  };

  const updateMaterialsInfo = async (obj) => {
    let deleteCount = 0;
    const paths = currentObject[0].path;
    const newObj = { ...obj, path: paths };
    if (filesForDelete.length) {
      filesForDelete.forEach(async (el) => {
        await deleteFile(currentObject, token, el);
        deleteCount += 1;
      });
    }
    if (filesForUpload.length !== 0) {
      if (currentObject !== undefined) {
        filesForUpload.forEach(
          async (el) => await deleteFile(currentObject, token, el[1])
        );
      }
      await updateFile(
        multiplePhotoUploadHandler,
        filesForUpload,
        newObj,
        path,
        token,
        request,
        paths,
        formatMaterialsForServer,
        filesForDelete.length
      );
    } else {
      const formattedObj = formatMaterialsForServer(obj, path);
      await request(
        `${URLS.SERVER_URL}${path}/${paths}`,
        'PUT',
        { ...formattedObj, path: paths },
        token
      );
    }
  };

  const handleDeleteTeacherClick = () => {
    deleteTeacherInfo(
      currentObject,
      path,
      teacherIndex,
      token,
      deletePhoto,
      request
    );
    setDeleteModal(false);
    setModalOpen(false);
  };

  const handleDeleteNewsClick = () => {
    deleteNewsInfo(currentObject, token, path, request);
    setDeleteModal(false);
    setModalOpen(false);
  };

  const onFinishTeachers = (newObj) =>
    displayCreateNew
      ? addNewTeacher(
          newObj,
          closeModal,
          addNewPhoto,
          filesForUpload,
          formatTeachersInfoForServer,
          path,
          token,
          request
        )
      : updateTeacherInfo(
          newObj,
          currentObject,
          token,
          request,
          path,
          teacherIndex,
          filesForUpload[0],
          formatTeachersInfoForServer,
          updatePhoto,
          deletePhoto,
          closeModal
        );

  const onFinishMaterials = (newObj) => {
    updateMaterialsInfo(newObj);
  };

  const onFinishNews = (newObj) => {
    displayCreateNew
      ? addNewNews(
          newObj,
          token,
          request,
          formatNewsForServer,
          filesForUpload,
          multiplePhotoUploadHandler,
          path
        )
      : updateNews(
          newObj,
          currentObject,
          token,
          request,
          formatNewsForServer,
          filesForDelete,
          filesForUpload,
          multiplePhotoUploadHandler,
          deleteManyPhotos,
          path
        );
  };

  const onFinish = isTeacherPath ? onFinishTeachers : onFinishMaterials;

  return (
    <>
      <Modal
        title={isNewsPath ? titleAddNews : modalTitle}
        visible={isModalOpen || displayCreateNew}
        onCancel={closeModal}
        className="EditModal"
        footer={[
          <Space key="space" className="EditModal__delete">
            {!displayCreateNew && (isTeacherPath || isNewsPath) && (
              <Button
                key={deleteTeacher}
                onClick={() => setDeleteModal(true)}
                type="primary"
                danger
              >
                {isTeacherPath ? deleteTeacher : deleteNews}
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
        {isTeacherPath && (
          <TeacherInfoForm
            {...{
              onFinish,
              form,
              setFilesForUpload,
              displayCreateNew,
              filesForUpload,
            }}
          />
        )}
        {isMaterialsPath && (
          <MaterialsForm
            {...{
              onFinish,
              form,
              setFilesForUpload,
              filesForUpload,
              path,
              filesForDelete,
              setFilesForDelete,
            }}
          />
        )}
        {isNewsPath && (
          <NewsForm
            {...{
              onFinishNews,
              form,
              setFilesForUpload,
              filesForUpload,
              displayCreateNew,
              isNewsPath,
              filesForDelete,
            }}
          />
        )}
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
              onClick={
                isTeacherPath ? handleDeleteTeacherClick : handleDeleteNewsClick
              }
            >
              {CONSTANTS.DELETE}
            </Button>,
          ]}
        >
          <p>
            {isTeacherPath
              ? CONSTANTS.DELETE_TEACHER_TEXT
              : CONSTANTS.DELETE_NEWS_TEXT}
          </p>
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
