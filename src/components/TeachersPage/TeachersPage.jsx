import React, { useEffect } from 'react';

import './TeachersPage.scss';

import Label from '../Label';
import Slider from '../Slider';

import { mockedData, filterData } from '../../utils';

const TeachersPage = () => {
  const {
    label,
    heading,
    teacherInfo,
  } = filterData(mockedData, 'teachers');

  const get = async () => {
    const PageFetch = await fetch('http://localhost:4000/teachers/', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
        'Access-Control-Request-Method': 'GET, POST, DELETE, PUT, OPTIONS',
      }
    })
    const data = await PageFetch.json();
    return data
  }

  useEffect(() => {
    const resp = async () => {
      const res = await get();
      console.log(res)
    }
    resp()
  }, [])

  return (
    <div className="TeachersPage container page">
      <Label text={label} />
      <h2 className="TeachersPage__title">{heading}</h2>
      <Slider teacherInfo={teacherInfo} />
    </div>
  );
};

export default TeachersPage;
