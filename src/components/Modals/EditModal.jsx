import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Input, Button, Space } from 'antd';

import { ACTIONS } from '../../store/actions/creators';

import TeacherInfoForm from './TeacherInfoForm';
import MaterialsForm from './MaterialsForm';
import NewsForm from './NewsForm';

import {
  getCurrentObj,
  formatObjForModal,
  formatTeachersInfoForServer,
  formatMaterialsForServer,
  formatNewsForServer,
  defaultContacts,
} from './Modals.utils';
import {
  useMessage,
  useHttp,
  addNewPhoto,
  updatePhoto,
  deletePhoto,
  updateFile,
  deleteFile,
  deleteManyPhotos,
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
  const [fileForUpload, setFileForUpload] = useState('');
  const [filesForUpload, setFilesForUpload] = useState([]);
  const filesForDelete = [];

  const [iDForUpload, setIdForUpload] = useState(0);
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

  const updateTeacherInfo = async (newObj) => {
    closeModal();
    const formattedObj = formatTeachersInfoForServer(newObj);

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
 
  const deleteNewsInfo = async (currentObject) => {
    
    const files = currentObject[0].photos.map(el => {
      return el.split('/')[el.split('/').length - 1]
    })
    console.log(currentObject[0]._id);
    await deleteManyPhotos(files, token);

    await request(
      `${URLS.SERVER_URL}${path}/${currentObject[0]._id}`,
      'DELETE',
      {},
      token
    );
  };

  const updateMaterialsInfo = async (obj) => {
    const paths = currentObject[0].path;
    const newObj = { ...obj, path: paths };
    if (fileForUpload) {
      await deleteFile(currentObject, token, iDForUpload);
      await updateFile(
        fileForUpload,
        newObj,
        path,
        token,
        request,
        paths,
        formatMaterialsForServer,
        iDForUpload
      );
    } else {
      console.log(path, paths);
      console.log(`${URLS.SERVER_URL}${path}/${paths}`);
      const formattedObj = formatMaterialsForServer(obj, path);
      await request(
        `${URLS.SERVER_URL}${path}/${paths}`,
        'PUT',
        { ...formattedObj, path: paths },
        token
      );
    }
  };

  const addNewTeacher = (newObj) => {
    closeModal();
    const formattedObj = formatTeachersInfoForServer(newObj);
    addNewPhoto(fileForUpload, formattedObj, path, token, request);
  };

  const handleDeleteTeacherClick = () => {
    deleteTeacherInfo();
    setDeleteModal(false);
    setModalOpen(false);
  };

  const handleDeleteNewsClick = () => {
    deleteNewsInfo(currentObject)
    setDeleteModal(false);
    setModalOpen(false);
  };

  const multipleFileUploadHandler = async (filesForUpload) => {
    // If file selected
    const data = new FormData();

    filesForUpload.forEach((el) => {
      data.append('images', el, el.name);
    });

    const res = await fetch(`${URLS.SERVER_URL}file/multiple-file-upload`, {
      method: 'POST',
      body: data,
      headers: { Authorization: `Bearer ${token}` },
    });

    const imgLocation = await res.json();
    return imgLocation;
  };

  const updateNews = async (obj) => {
    const formattedObj = {
      ...formatNewsForServer(obj),
      _id: currentObject[0]._id,
    };
    if (filesForDelete) {
      const files = filesForDelete.map((el) => {
        return currentObject[0].photos[el.name].split('/')[
          currentObject[0].photos[el.name].split('/').length - 1
        ];
      });
      deleteManyPhotos(files, token);
    }
    if (filesForUpload.length) {
      multipleFileUploadHandler(filesForUpload).then((res) => {
        console.log(res);
        res.forEach((el) => formattedObj.photos.push(el));
        request(
          `${URLS.SERVER_URL}${path}/${formattedObj._id}`,
          'PUT',
          { ...formattedObj },
          token
        );
      });
    } else {
      await request(
        `${URLS.SERVER_URL}${path}/${formattedObj._id}`,
        'PUT',
        { ...formattedObj },
        token
      );
    }
  };

  const onFinishTeachers = displayCreateNew ? addNewTeacher : updateTeacherInfo;
  const onFinishMaterials = (newObj) => {
    updateMaterialsInfo(newObj, fileForUpload);
  };
  const onFinishNews = (newObj) => {
    displayCreateNew ? console.log('object') : updateNews(newObj);
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
              setFileForUpload,
              fileForUpload,
              displayCreateNew,
            }}
          />
        )}
        {isMaterialsPath && (
          <MaterialsForm
            {...{
              onFinishNews,
              onFinish,
              form,
              setFileForUpload,
              fileForUpload,
              path,
              setIdForUpload,
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
              setIdForUpload,
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
