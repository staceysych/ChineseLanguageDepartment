import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { Spin } from 'antd';

import './About.scss';
import 'antd/dist/antd.css';

import Button from '../Button';
import Label from '../Label';

import { ACTIONS } from '../../store/actions/creators';

const About = ({ isLoading, onContentLoaded }) => {
  useEffect(() => {
    onContentLoaded(false);
  }, []);

  const aboutElement = (
    <>
      <Label text="О кафедре" />
      <h3 className="About__title">
        <span>Кафедра</span> создана 01 января 2018 года (Приказ № 268).
      </h3>
      <div className="About__description">
        <div className="About__description_info">
          Подготовка осуществляется по специальностям 21 06 01 01{' '}
          <span>«Современные иностранные языки (преподавание)»</span>, 21 06 01
          02 <span>«Современные иностранные языки (перевод)»</span>, 23 01 02{' '}
          <span>«Лингвистическое обеспечение межкультурной коммуникации»</span>
        </div>
        <div className="About__description_features">
          <h3>Особенности обучения</h3>
          На кафедре преподают как белорусские преподаватели, так и носители
          китайского языка.
        </div>
      </div>
      <div className="About__admin">
        <div className="About__admin_info">
          <h3>Зав. кафедрой теории и практики китайского языка:</h3>
          <span>Гордей Александр Николаевич</span>,
          <br />
          доктор филологических наук, профессор
          <div className="About__admin_contacts">
            <span>Каб.:</span> В-313 <br />
            <span>E-mail:</span> {''}
            <a href="mailto:chineselang@mslu.by">chineselang@mslu.by</a>
          </div>
        </div>
        <div className="About__admin_details">
          <div className="About__admin_sources">
            <Button text="Контакты" />
            <Button text="Веб сайт" />
          </div>
          <div className="About__admin_photo">
            <img src="../src/icons/Gordei.jpg" />
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

export default connect(mapStateToProps, {onContentLoaded: ACTIONS.setLoading })(About);
