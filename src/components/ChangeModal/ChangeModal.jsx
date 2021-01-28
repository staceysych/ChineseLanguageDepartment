import React, { useState, useEffect } from 'react';
import { useHttp } from '../../utils';
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
    if (text.length < 10) { return }
    setNewMainDescription(text)
  }
  const handleChangeLabel = (text) => {
    if (text.length < 10) { return }
    setNewLabel(text)
  }
  const handleChangeHeading = (text) => {
    if (text.length < 10) { return }
    setNewHeading(text)
  }
  const handleChangeFeaturesTitle = (text) => {
    if (text.length < 10) { return }
    setNewFeaturesTitle(text)
  }
  const handleChangeFeaturesInfo = (text) => {
    if (text.length < 10) { return }
    setNewFeaturesInfo(text)
  }
  const handleChangeDetailsTitle = (text) => {
    if (text.length < 10) { return }
    setNewDetailsTitle(text)
  }
  const handleChangeDetailsInfo = (text) => {
    if (text.length < 10) { return }
    setNewDetailsInfo(text)
  }
  const handleChangeAdressRoom = (text) => {
    if (text.length < 10) { return }
    setNewAdressRoom(text)
  }
  const handleChangeAdressPlace = (text) => {
    if (text.length < 10) { return }
    setNewAdressPlace(text)
  }
  const handleChangeEmail = (text) => {
    if (text.length < 10) { return }
    setNewEmail(text)
  }
  const handleChangeMobile = (text) => {
    if (text.length < 10) { return }
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
          <Button key={1} text={'Return'} fn={handleCancel} ></Button>,
          <Button  key={2} text={'Submit'} fn={handleOk} ></Button>
        ]}
      >
        <Input placeholder="Заголовок" key={1} className='changeModal_input' onChange={(e) => handleChangeHeading(e.target.value)} value={data.heading} />
        <Input placeholder="Описание Заголовка" key={2} className='changeModal_input' onChange={(e) => handleChangeDescription(e.target.value)} />
        <Input placeholder="Метка" key={3} className='changeModal_input' onChange={(e) => handleChangeLabel(e.target.value)} />
        <Input placeholder="Особенности" key={4} className='changeModal_input' onChange={(e) => handleChangeFeaturesTitle(e.target.value)} />
        <Input placeholder="Описание особенностей" key={5} className='changeModal_input' onChange={(e) => handleChangeFeaturesInfo(e.target.value)} />
        <Input placeholder="Детали" key={6} className='changeModal_input' onChange={(e) => handleChangeDetailsTitle(e.target.value)} />
        <Input placeholder="Описание деталей" key={7} className='changeModal_input' onChange={(e) => handleChangeDetailsInfo(e.target.value)} />
        <Input placeholder="Место нахождения" key={8} className='changeModal_input' onChange={(e) => handleChangeAdressPlace(e.target.value)} />
        <Input placeholder="Номер кабинета" key={9} className='changeModal_input' onChange={(e) => handleChangeAdressRoom(e.target.value)} />
        <Input placeholder="E-MAIL" key={10} className='changeModal_input' onChange={(e) => handleChangeEmail(e.target.value)} />
        <Input placeholder="Телефон"  key={11} className='changeModal_input' onChange={(e) => handleChangeMobile(e.target.value)} />
      </Modal> </>
  );
};

export default ChangeModal;