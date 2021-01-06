import React from 'react';
import { Router } from '@reach/router';

import './App.scss';

import Nav from '../Navigation';
import MainPage from '../MainPage';
import About from '../About';

const App = () => {
  return (
    <div className="App">
      <Nav />
      <Router>
        <MainPage path="/" />
        <About path="about" />
        <Me path="me" />
      </Router>
    </div>
  );
};

const Me = () => {
  return <div>Hi me</div>;
};

export default App;
