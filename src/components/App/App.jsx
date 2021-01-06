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
      </Router>
    </div>
  );
};

export default App;
