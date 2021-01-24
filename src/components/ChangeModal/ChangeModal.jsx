import React, { useState, useEffect } from 'react';
import { useHttp } from '../../utils/request'
import { Modal, Input } from 'antd';
import Button from '../Button';
import './ChangeModal.scss';

const ChangeModal = (props) => {
  const [visible, setVisible] = useState(false)
  const [data, setData] = useState({})
  const { request, error, clearError } = useHttp()
  const [mainDescription, setNewMainDescription] = useState(data.mainDescription);
  const [label, setNewLabel] = useState(data.label);
  const [heading, setNewHeading] = useState(data.heading);
  const [featuresTitle, setNewFeaturesTitle] = useState(data.featuresTitle);
  const [featuresInfo, setNewFeaturesInfo] = useState(data.featuresInfo);
  const [detailsTitle, setNewDetailsTitle] = useState(data.detailsTitle);
  const [detailsInfo, setNewDetailsInfo] = useState(data.detailsInfo);
  const [adressPlace, setNewAdressPlace] = useState(data.adressPlace);
  const [adressRoom, setNewAdressRoom] = useState(data.adressRoom);
  const [email, setNewEmail] = useState(data.email);
  const [mobile, setNewMobile] = useState(data.mobile);


  useEffect(() => {
    if (props.data) {
      setData(props.data)
    }
  }, [])

  const handleEdit = () => {
    setVisible(true)
  }

  const handleOk = async () => {
    const newInfo = {
      mainDescription,
      label,
      heading,
      featuresTitle,
      featuresInfo,
      detailsTitle,
      detailsInfo,
      adressPlace,
      adressRoom,
      email,
      mobile
    }
    const response = await request('http://localhost:4000/', 'PUT', { ...newInfo });
    setVisible(false)
  }
  const handleCancel = () => {
    setNewMainDescription('')
    setVisible(false)
  }

  const handleChangeDescription = (text) => {
    setNewMainDescription(text)
  }
  const handleChangeLabel = (text) => {
    setNewLabel(text)
  }
  const handleChangeHeading = (text) => {
    setNewHeading(text)
  }
  const handleChangeFeaturesTitle = (text) => {
    setNewFeaturesTitle(text)
  }
  const handleChangeFeaturesInfo = (text) => {
    setNewFeaturesInfo(text)
  }
  const handleChangeDetailsTitle = (text) => {
    setNewDetailsTitle(text)
  }
  const handleChangeDetailsInfo = (text) => {
    setNewDetailsInfo(text)
  }
  const handleChangeAdressRoom = (text) => {
    setNewAdressRoom(text)
  }
  const handleChangeAdressPlace = (text) => {
    setNewAdressPlace(text)
  }
  const handleChangeEmail = (text) => {
    setNewEmail(text)
  }
  const handleChangeMobile = (text) => {
    setNewMobile(text)
  }



  return (
    <><div onClick={handleEdit} className='modal'>
      MODAL
    </div>
      <Modal
        visible={visible}
        title={'Изменить Страницу'}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button text={'Return'} fn={handleCancel} ></Button>,
          <Button text={'Submit'} fn={handleOk} ></Button>
        ]}
      >
        <Input placeholder="Заголовок" className='changeModal_input' onChange={(e) => handleChangeHeading(e.target.value)} />
        <Input placeholder="Описание Заголовка" className='changeModal_input' onChange={(e) => handleChangeDescription(e.target.value)} />
        <Input placeholder="Метка" className='changeModal_input' onChange={(e) => handleChangeLabel(e.target.value)} />
        <Input placeholder="Особенности" className='changeModal_input' onChange={(e) => handleChangeFeaturesTitle(e.target.value)} />
        <Input placeholder="Описание особенностей" className='changeModal_input' onChange={(e) => handleChangeFeaturesInfo(e.target.value)} />
        <Input placeholder="Детали" className='changeModal_input' onChange={(e) => handleChangeDetailsTitle(e.target.value)} />
        <Input placeholder="Описание деталей" className='changeModal_input' onChange={(e) => handleChangeDetailsInfo(e.target.value)} />
        <Input placeholder="Место нахождения" className='changeModal_input' onChange={(e) => handleChangeAdressPlace(e.target.value)} />
        <Input placeholder="Номер кабинета" className='changeModal_input' onChange={(e) => handleChangeAdressRoom(e.target.value)} />
        <Input placeholder="E-MAIL" className='changeModal_input' onChange={(e) => handleChangeEmail(e.target.value)} />
        <Input placeholder="Телефон" className='changeModal_input' onChange={(e) => handleChangeMobile(e.target.value)} />
      </Modal> </>
  );
};

export default ChangeModal;