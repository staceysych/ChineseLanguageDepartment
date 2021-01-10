import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { Spin } from 'antd';

import './About.scss';

import Button from '../Button';
import Label from '../Label';
import GordeiPhoto from '../../icons/teachers/Gordei.jpg';

import { ACTIONS } from '../../store/actions/creators';

import { filterData, mockedData } from '../../utils';

const About = ({ isLoading, setLoading }) => {
  const {
    label,
    heading,
    description: { main, features},
    details: {title, info, contacts: { address, mail }}

  } = filterData(mockedData, 'about');

  useEffect(() => {
    setLoading(false);
  }, []);

  const aboutElement = (
    <>
      <Label text={label} />
      <h3 className="About__title">
        {heading}
      </h3>
      <div className="About__description">
        <div className="About__description_info">
          {main}
        </div>
        <div className="About__description_features">
          <h3>{features.title}</h3>
          {features.info}
        </div>
      </div>
      <div className="About__admin">
        <div className="About__admin_info">
          <h3>{title}</h3>
          <span>{info}</span>
          <div className="About__admin_contacts">
            <span>{address.place}</span> {address.room}<br />
            <span>{mail.name}</span> {''}
            <a href={`mailto:${mail.email}`}>{mail.email}</a>
          </div>
        </div>
        <div className="About__admin_details">
          <div className="About__admin_sources">
            <Button className="About__btn" text="Контакты" />
            <Button className="About__btn" text="Веб сайт" />
          </div>
          <div className="About__admin_photo">
            <img src={GordeiPhoto} />
          </div>
        </div>
      </div>
    </>
  );

  return <div className="About container page">
    {isLoading ? <Spin size="large" /> : aboutElement}
  </div>;
};

const mapStateToProps = (state) => ({
  isLoading: state.pages.isLoading,
});

export default connect(mapStateToProps, {setLoading: ACTIONS.setLoading })(About);
