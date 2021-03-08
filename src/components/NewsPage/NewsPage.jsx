import React, { useEffect } from 'react';
import { useHttp } from '../../utils';
import { connect } from 'react-redux';
import { Spin } from 'antd';

import { ACTIONS } from '../../store/actions/creators';

import './NewsPage.scss';

import Label from '../Label';
import NewsCard from '../NewsCard';
import NewsPagination from '../Pagination';
import TableView from '../TableView';

import { NewsModal } from '../Modals';

import { URLS } from '../../constants';

const NewsPage = ({
  setAllNews,
  data,
  setFetchedData,
  path,
  history,
  setHistory,
  userData: { token },
  isModalOpen,
}) => {
  const { request } = useHttp();

  useEffect(() => {
    const oldPage = history.find((item) => item.page === path);
    if (oldPage) {
      setFetchedData({ ...oldPage });
      getAllElements(oldPage.news);
    } else {
      request(`${URLS.SERVER_URL}${path}`)
        .then((response) => {
          setFetchedData({ ...response.page, news: response.news });
          getAllElements(response.news);
          setHistory(history, { ...response.page, news: response.news });
        })
        .catch((e) => {});
    }
  }, []);

  const getAllElements = (news) => {
    setAllNews(news);
  };

  const page = (
    <>
      <Label text={data.label} />
      <div className="NewsPage__layout">
        <h2 className="NewsPage__title">{data.heading}</h2>
        <div className="NewsPage__wrapper">
          <NewsCard />
        </div>
        <NewsPagination />
      </div>
      {isModalOpen && <NewsModal />}
    </>
  );

  const newsElement = token ? <TableView path={path} /> : page;

  return (
    <div className="NewsPage page container">
      {data.page === 'news' ? newsElement : <Spin size="large" />}
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.pages.data,
  history: state.pages.history,
  userData: state.pages.userData,
  isModalOpen: state.pages.isModalOpen,
});

export default connect(mapStateToProps, {
  setFetchedData: ACTIONS.setFetchedData,
  setAllNews: ACTIONS.setAllNews,
  setHistory: ACTIONS.setHistory,
})(NewsPage);
