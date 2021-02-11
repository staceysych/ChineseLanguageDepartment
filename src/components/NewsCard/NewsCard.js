import React from 'react';
import { Card } from 'antd';
import { connect } from 'react-redux';

import './NewsCard.scss';

import { generateCurrentNews } from '../Pagination/NewsPagination.utils';
import { getFormattedDate } from '../../utils';

import { ACTIONS } from '../../store/actions/creators';

import Button from '../Button';

const NewsCard = ({ allNews, newsPerPage, currentNewsPage, setModalOpen }) => {
  const { Meta } = Card;

  const news = generateCurrentNews(allNews, currentNewsPage, newsPerPage);

  const openModal = () => {
    setModalOpen(true);
  };

  return news
    ? news.map(({ coverPhoto, description, title, date }, index) => {
        return (
          <div className="NewsCard" key={index}>
            <Card
              hoverable
              cover={
                <img
                  className="NewsCard__photo"
                  alt="example"
                  src={coverPhoto}
                />
              }
            >
              <Meta
                className="NewsCard__meta"
                title={title}
                description={description}
              />
              <div className="NewsCard__date">{getFormattedDate(date)}</div>
              <Button
                className="NewsCard__btn"
                text="Подробнее"
                fn={openModal}
              />
            </Card>
          </div>
        );
      })
    : null;
};
const mapStateToProps = (state) => ({
  newsPerPage: state.pages.newsPerPage,
  allNews: state.pages.allNews,
  currentNewsPage: state.pages.currentNewsPage,
});

export default connect(mapStateToProps, {
  setModalOpen: ACTIONS.setModalOpen,
})(NewsCard);
