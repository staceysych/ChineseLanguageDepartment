import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { ACTIONS } from '../../store/actions/creators';

import './NewsPage.scss';

import Label from '../Label';
import NewsCard from '../NewsCard';
import NewsPagination from '../Pagination';

import { mockedData, filterData } from '../../utils';

const NewsPage = ({ setAllNews }) => {
  const { label, heading, news } = filterData(mockedData, 'page', 'news');

  useEffect(() => {
    getAllElements();
  }, []);

  const getAllElements = () => {
    setAllNews(news);
  };

  return (
    <div className="NewsPage page container">
      <Label text={label} />
      <div className="NewsPage__layout">
        <h2 className="NewsPage__title">{heading}</h2>
        <div className="NewsPage__wrapper">
          <NewsCard />
        </div>
        <NewsPagination />
      </div>
    </div>
  );
};

export default connect(null, {
  setAllNews: ACTIONS.setAllNews,
})(NewsPage);
