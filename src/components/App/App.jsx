import React from 'react';
import { Router } from '@reach/router';
import { Provider } from 'react-redux';

import 'antd/dist/antd.css';
import '../../global-styles/global.scss';
import './App.scss';

import Nav from '../Navigation';
import MainPage from '../MainPage';
import About from '../About';

import store from '../../store';

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Nav />
        <Router>
          <MainPage path="/" />
          <About path="about" />
        </Router>
      </div>
    </Provider>
  );
};

export default App;
