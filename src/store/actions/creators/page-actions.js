import { SET_LOADING, SET_PATH, SET_ALL_NEWS, SET_CURRENT_NEWS_PAGE } from '../types';

const setLoading = (isLoading) => ({ type: SET_LOADING, isLoading });

const setPath = (path) => ({ type: SET_PATH, path });
const setAllNews = (news) => ({
  type: SET_ALL_NEWS,
  allNews: { news, totalNews: news.length },
});
const setCurrentNewsPage = (pageNumber) => ({
  type: SET_CURRENT_NEWS_PAGE,
  currentNewsPage: pageNumber,
});

export default {
  setLoading,
  setPath,
  setAllNews,
  setCurrentNewsPage,
};
