import React from 'react';
import { Card } from 'antd';

import './ContactsPage.scss';

import Label from '../Label';
import Map from '../Map';

import { mockedData, filterData } from '../../utils';

const ContactsPage = () => {
  const { label, contacts, heading } = filterData(
    mockedData,
    'page',
    'contacts'
  );

  const { address, room, phone, email, media } = contacts;

  return (
    <div className="ContactsPage page container">
      <Label text={label} />
      <div className="ContactsPage__layout">
        <Card className="ContactsPage__card" title={heading}>
          <p>{address}</p>
          <p>{room}</p>
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
        <Map address={address} />
      </div>
    </div>
  );
};

export default ContactsPage;
