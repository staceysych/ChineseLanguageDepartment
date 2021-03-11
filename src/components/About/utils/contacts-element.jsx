import React from 'react';

import { CONSTANTS } from '../../../constants';

export const contactsElement = (data) => {
  const { TEACHER_CONTACTS} = CONSTANTS;
  const {
    personEmail,
    personWebsite,
    mobile,
  } = data;

  return (
  <div className="About__admin_contacts">
    <h3>{TEACHER_CONTACTS.name}</h3>
    <p>
      {TEACHER_CONTACTS.mobile}: <a href={`tel:${mobile}`}>{mobile}</a>
    </p>
    <p>
      {TEACHER_CONTACTS.email}:{' '}
      <a href={`mailto:${personEmail}`}>{personEmail}</a>
    </p>
    <p>
      {TEACHER_CONTACTS.website}:{' '}
      <a href={personWebsite} target="_blank">{personWebsite}</a>
    </p>
  </div>
)};
