import {
  SET_LOADING,
  SET_PATH,
  SET_ALL_NEWS,
  SET_CURRENT_NEWS_PAGE,
  SET_FETCHED_DATA,
  SET_MODAL_OPEN,
  SET_TEACHER_INDEX,
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
  data
})
const setModalOpen = (isModalOpen) => ({
  type: SET_MODAL_OPEN,
  isModalOpen,
});
const setTeacherIndex = (teacherIndex) => ({
  type: SET_TEACHER_INDEX,
  teacherIndex,
})

export default {
  setLoading,
  setPath,
  setAllNews,
  setCurrentNewsPage,
  setFetchedData,
  setModalOpen,
  setTeacherIndex,
};
