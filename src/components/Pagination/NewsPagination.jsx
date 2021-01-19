import React from 'react';
import { Pagination } from 'antd';
import { connect } from 'react-redux';

import { ACTIONS } from '../../store/actions/creators';

import './NewsPagination.scss';

const NewsPagination = ({
  allNews,
  newsPerPage,
  setCurrentNewsPage,
  currentNewsPage,
}) => {
  return (
    <div className="NewsPagination">
      <Pagination
        current={currentNewsPage}
        onChange={setCurrentNewsPage}
        total={allNews.totalNews}
        pageSize={newsPerPage}
        showSizeChanger={false}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  newsPerPage: state.pages.newsPerPage,
  allNews: state.pages.allNews,
  currentNewsPage: state.pages.currentNewsPage,
});

export default connect(mapStateToProps, {
  setCurrentNewsPage: ACTIONS.setCurrentNewsPage,
})(NewsPagination);
