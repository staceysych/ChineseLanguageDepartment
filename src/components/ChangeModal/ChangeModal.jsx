import React, { useState, useEffect } from 'react';
import { useHttp } from '../../utils';

import { URLS } from '../../constants';

import { Modal, Input } from 'antd';
import Button from '../Button';

import './ChangeModal.scss';

const ChangeModal = (props) => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({});
  const { request } = useHttp();
  const [mainDescription, setNewMainDescription] = useState(
    data.mainDescription
  );
  const [label, setNewLabel] = useState(data.label);
  const [heading, setNewHeading] = useState(data.heading);
  const [featuresTitle, setNewFeaturesTitle] = useState(data.featuresTitle);
  const [featuresInfo, setNewFeaturesInfo] = useState(data.featuresInfo);
  const [detailsTitle, setNewDetailsTitle] = useState(data.detailsTitle);
  const [detailsInfo, setNewDetailsInfo] = useState(data.detailsInfo);
  const [addressPlace, setNewAddressPlace] = useState(data.addressPlace);
  const [addressRoom, setNewAddressRoom] = useState(data.addressRoom);
  const [email, setNewEmail] = useState(data.email);
  const [mobile, setNewMobile] = useState(data.mobile);
  const [imga, setImg] = useState(null);

  useEffect(() => {
    if (props.data) {
      setData(props.data);
    }
  }, []);

  const handleEdit = () => {
    setVisible(true);
  };

  const handleOk = async () => {
    const newInfo = {
      mainDescription,
      label,
      heading,
      featuresTitle,
      featuresInfo,
      detailsTitle,
      detailsInfo,
      addressPlace,
      addressRoom,
      email,
      mobile,
    };
    const response = await request(
      `${URLS.SERVER_URL}`,
      'PUT',
      { ...newInfo },
      { Authorization: `Bearer ${props.token}` }
    );
    message(response.message);
    setVisible(false);
  };
  const handleCancel = () => {
    setNewMainDescription('');
    setVisible(false);
  };
  const singleFileChangedHandler = (event) => {
    setImg(event.target.files[0]);
  };

  const handleChangeDescription = (text) => {
    setNewMainDescription(text);
  };
  const handleChangeLabel = (text) => {
    setNewLabel(text);
  };
  const handleChangeHeading = (text) => {
    setNewHeading(text);
  };
  const handleChangeFeaturesTitle = (text) => {
    setNewFeaturesTitle(text);
  };
  const handleChangeFeaturesInfo = (text) => {
    setNewFeaturesInfo(text);
  };
  const handleChangeDetailsTitle = (text) => {
    setNewDetailsTitle(text);
  };
  const handleChangeDetailsInfo = (text) => {
    setNewDetailsInfo(text);
  };
  const handleChangeAddressRoom = (text) => {
    setNewAddressRoom(text);
  };
  const handleChangeAddressPlace = (text) => {
    setNewAddressPlace(text);
  };
  const handleChangeEmail = (text) => {
    setNewEmail(text);
  };
  const handleChangeMobile = (text) => {
    setNewMobile(text);
  };

  const singleFileUploadHandler = (event) => {
    const d = new FormData();
    // If file selected
    if (imga) {
      d.append('image', imga, imga.name);
      fetch('http://localhost:4000/file/upload', {
        method: 'POST',
        body: d,
        headers: { Authorization: `Bearer ${props.token}` }
      })
        .then((res) => res.json())
        .then((datas) => {
          request(
            'http://localhost:4000/teachers',
            'POST',
            { photo: datas, name: 'gay' },
            { Authorization: `Bearer ${props.token}` }
          );
        })
        .catch(console.error);
    } else {
      // if file not selected throw error
      console.log('Please upload file', 'red');
    }
  };

  return (
    <>
      <div onClick={handleEdit} className="modal">
        MODAL
      </div>
      <Modal
        visible={visible}
        title={'Изменить Страницу'}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key={1} text={'Return'} fn={handleCancel}></Button>,
          <Button key={2} text={'Submit'} fn={handleOk}></Button>,
        ]}
      >
        <input type="file" id="image" onChange={singleFileChangedHandler} />
        <button className="btn btn-info" onClick={singleFileUploadHandler}>
          Upload!
        </button>
        <Input
          placeholder="Заголовок"
          key={1}
          className="changeModal_input"
          onChange={(e) => handleChangeHeading(e.target.value)}
          value={data.heading}
        />
        <Input
          placeholder="Описание Заголовка"
          key={2}
          className="changeModal_input"
          onChange={(e) => handleChangeDescription(e.target.value)}
        />
        <Input
          placeholder="Метка"
          key={3}
          className="changeModal_input"
          onChange={(e) => handleChangeLabel(e.target.value)}
        />
        <Input
          placeholder="Особенности"
          key={4}
          className="changeModal_input"
          onChange={(e) => handleChangeFeaturesTitle(e.target.value)}
        />
        <Input
          placeholder="Описание особенностей"
          key={5}
          className="changeModal_input"
          onChange={(e) => handleChangeFeaturesInfo(e.target.value)}
        />
        <Input
          placeholder="Детали"
          key={6}
          className="changeModal_input"
          onChange={(e) => handleChangeDetailsTitle(e.target.value)}
        />
        <Input
          placeholder="Описание деталей"
          key={7}
          className="changeModal_input"
          onChange={(e) => handleChangeDetailsInfo(e.target.value)}
        />
        <Input
          placeholder="Место нахождения"
          key={8}
          className="changeModal_input"
          onChange={(e) => handleChangeAddressPlace(e.target.value)}
        />
        <Input
          placeholder="Номер кабинета"
          key={9}
          className="changeModal_input"
          onChange={(e) => handleChangeAddressRoom(e.target.value)}
        />
        <Input
          placeholder="E-MAIL"
          key={10}
          className="changeModal_input"
          onChange={(e) => handleChangeEmail(e.target.value)}
        />
        <Input
          placeholder="Телефон"
          key={11}
          className="changeModal_input"
          onChange={(e) => handleChangeMobile(e.target.value)}
        />
      </Modal>{' '}
    </>
  );
};

export default ChangeModal;
