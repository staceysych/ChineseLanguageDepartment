import React from 'react';

import './NewsPage.scss';

import Label from '../Label';
import NewsCard from '../NewsCard';

import { mockedData, filterData } from '../../utils';

const NewsPage = () => {
  const { label, heading, news } = filterData(mockedData, 'page', 'news');

  return (
    <div className="NewsPage page container">
      <Label text={label} />
      <div className="NewsPage__layout">
        <h2 className="NewsPage__title">{heading}</h2>
        <div className="NewsPage__wrapper">
          <NewsCard />
          <NewsCard />
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
