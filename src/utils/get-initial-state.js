export const getInitialState = () => {
  const {
    path,
  } = localStorage.settings ? JSON.parse(localStorage.settings) : {};

  return {
    path: path || location.href,
    allNews: {},
    newsPerPage: 3,
    currentNewsPage: 1,
    data: {},
    isModalOpen: false,
  };
};
