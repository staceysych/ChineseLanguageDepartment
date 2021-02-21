import React, { useState, useEffect } from 'react';
import { useHttp, useMessage } from '../../utils';
import { connect } from 'react-redux';

import { Modal, Input } from 'antd';

import Button from '../Button';

import { URLS } from '../../constants';
import { ACTIONS } from '../../store/actions/creators';

import './LoginModal.scss';

const LoginModal = ({ userData: { token }, setToken }) => {
  const [visible, setVisible] = useState(false);

  const { request } = useHttp();
  const message = useMessage()


  const [login, setNewLogin] = useState('');
  const [password, setNewPassword] = useState('');

  useEffect(() => {
    setNewPassword(''), setNewLogin('');
  }, [visible]);

  const handleEdit = () => {
    setVisible(true);
  };

  const handleLogin = async () => {
    const info = {
      login,
      password,
    };
    await request(`${URLS.SERVER_URL}auth/login`, 'POST', { ...info })
      .then((data) => {
        setToken(data.token, data.userId);
      })
      .catch((e) => {});
    setVisible(false);
  };

  const handleLogout = async () => {
    
    await location.replace('http://localhost:8080/')
    message('Вы успешно вышли из системы!');
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
        <>
          <Button
            key={5}
            className={'login_button'}
            text={'Выйти'}
            fn={handleEdit}
          ></Button>
          <Modal
            visible={visible}
            title={'Выход'}
            onCancel={handleCancel}
            footer={[
              <Button
                key={2}
                text={'Выйти'}
                fn={() => {
                  handleLogout();
                  handleCancel();
                }}
              ></Button>,
            ]}
          >
            <p>Произвести выход из системы?</p>
          </Modal>
        </>
      ) : (
        <>
          <Button
            key={4}
            className={'login_button'}
            text={'Войти'}
            fn={handleEdit}
          ></Button>

          <Modal
            visible={visible}
            title={'Вход'}
            onCancel={handleCancel}
            footer={[<Button key={2} text={'Войти'} fn={handleLogin}></Button>]}
          >
            <Input
              placeholder="Логин"
              key={1}
              allowClear={true}
              value={login}
              className="changeModal_input"
              onPressEnter={(e) => {
                console.log(e);
                handleLogin();
                handleCancel();
              }}
              onChange={(e) => handleChangeLogin(e.target.value)}
            />
            <Input.Password
              placeholder="Пароль"
              allowClear={true}
              value={password}
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
      )}
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
