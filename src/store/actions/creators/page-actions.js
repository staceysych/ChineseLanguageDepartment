import {
  SET_LOADING,
  SET_PATH,
  SET_ALL_NEWS,
  SET_CURRENT_NEWS_PAGE,
  SET_FETCHED_DATA,
  SET_MODAL_OPEN,
  SET_TOKEN,
} from '../types';

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

const setFetchedData = (data) => ({
  type: SET_FETCHED_DATA,
  data,
});
const setModalOpen = (isModalOpen, index) => ({
  type: SET_MODAL_OPEN,
  isModalOpen,
  index,
});
const setToken = (token, userId) => ({
  type: SET_TOKEN,
  userData: { token, userId },
});

export default {
  setLoading,
  setPath,
  setAllNews,
  setCurrentNewsPage,
  setFetchedData,
  setModalOpen,
  setToken,
};
