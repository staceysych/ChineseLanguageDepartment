import React, { useState, useEffect } from 'react';
import { useHttp, useMessage } from '../../utils';
import { connect } from 'react-redux';

import { Modal, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

import Button from '../Button';

import { ACTIONS } from '../../store/actions/creators';

import './LoginModal.scss';

const LoginModal = ({ userData: { token }, setToken }) => {
  const [visible, setVisible] = useState(false);

  const { request, error, clearError } = useHttp();
  const message = useMessage();

  const [login, setNewLogin] = useState('');
  const [password, setNewPassword] = useState('');

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const handleEdit = () => {
    setVisible(true);
  };

  const handleLogin = async () => {
    const info = {
      login,
      password,
    };
    await request('http://localhost:4000/auth/login', 'POST', { ...info })
      .then((data) => {
        setToken(data.token, data.userId);
      })
      .catch((e) => {});
    setVisible(false);
  };

  const handleLogout = async () => {
    setToken(null, null);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleChangeLogin = (text) => {
    setNewLogin(text);
  };

  const handleChangePassword = (text) => {
    setNewPassword(text);
  };

  return (
    <>
      {token ? (
        <Button key={5} className={'login_button'} text={'Выйти'} fn={handleLogout}></Button>
      ) : (
        <Button key={4} className={'login_button'} text={'Войти'} fn={handleEdit}></Button>
      )}
      <Modal
        visible={visible}
        title={'Вход'}
        onCancel={handleCancel}
        footer={[
          <Button key={2} text={'Войти'} fn={handleLogin}></Button>,
          <Button key={1} text={'Вернуться'} fn={handleCancel}></Button>,
        ]}
      >
        <Input
          placeholder="Логин"
          key={1}
          className="changeModal_input"
          onPressEnter={() => {
            handleLogin();
            handleCancel();
          }}
          onChange={(e) => handleChangeLogin(e.target.value)}
        />
        <Input.Password
          placeholder="Пароль"
          key={2}
          onPressEnter={() => {
            handleLogin();
            handleCancel();
          }}
          className="changeModal_input"
          onChange={(e) => handleChangePassword(e.target.value)}
        />
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({
  userData: state.pages.userData,
});

export default connect(mapStateToProps, {
  setToken: ACTIONS.setToken,
  setFetchedData: ACTIONS.setFetchedData,
})(LoginModal);
