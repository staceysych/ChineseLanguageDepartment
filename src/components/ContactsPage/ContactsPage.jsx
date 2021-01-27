import React, { useEffect, useState } from 'react';
import { useHttp } from '../../utils/request'
import { Card } from 'antd';

import './ContactsPage.scss';

import Label from '../Label';
import Map from '../Map';


const ContactsPage = () => {
const [data, setData] = useState({})
const { request, error, clearError } = useHttp()

useEffect(() => {
  const requestHandler = async () => {
    try {
      const response = await request('http://localhost:4000/contacts');
      setData(response)
    } catch (e) { }
  }
  requestHandler()
}, []);


  const media = [{
    link: data.mediaLink,
    icon: data.mediaIcon,
    name: data.mediaName
  }]

  console.log(media);
  const { adressPlace, adressRoom, phone, email, label, heading } = data;

  return (
    <div className="ContactsPage page container">
      <Label text={label} />
      <div className="ContactsPage__layout">
        <Card className="ContactsPage__card" title={heading}>
          <p>{adressPlace}</p>
          <p>{adressRoom}</p>
          <p>
            <a href={`tel:${phone}`}>{phone}</a>
          </p>
          <p>
            <a href={`mailto:${email}`}>{email}</a>
          </p>
          <div className="ContactsPage__media">
            {media.map(({ link, icon, name }) => (
              <a target="_blank" key={name} href={link}>
                <img src={icon} alt="mslu" />
              </a>
            ))}
          </div>
        </Card>
        <Map address={adressPlace} />
      </div>
    </div>
  );
};

export default ContactsPage;
