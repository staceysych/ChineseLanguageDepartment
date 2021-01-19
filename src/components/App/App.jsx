import React from 'react';
import { Router } from '@reach/router';
import { Provider } from 'react-redux';

import 'antd/dist/antd.css';
import '../../global-styles/global.scss';
import './App.scss';

import Nav from '../Navigation';
import MainPage from '../MainPage';
import About from '../About';
import TeachersPage from '../TeachersPage';
import MaterialsPage from '../MaterialsPage';
import MaterialsBoard from '../MaterialsBoard';
import NewsPage from '../NewsPage';

import store from '../../store';

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Nav />
        <Router>
          <MainPage path="/" />
          <About path="about" />
          <TeachersPage path="teachers" />
          <MaterialsPage path="study">
            <MaterialsBoard path="/*" page="study" />
          </MaterialsPage>
          <MaterialsPage path="science">
            <MaterialsBoard path="/*" page="science" />
          </MaterialsPage>
          <NewsPage path="news" />
        </Router>
      </div>
    </Provider>
  );
};

export default App;
