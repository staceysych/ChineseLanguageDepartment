export const getInitialState = () => {
  const { path, userData } = localStorage.settings
    ? JSON.parse(localStorage.settings)
    : {};

  return {
    path: path || location.href,
    allNews: {},
    newsPerPage: 3,
    currentNewsPage: 1,
    data: {},
    isModalOpen: false,
    index: null,
    userData: userData || {},
    history: [],
    teacherIndex: null,
  };
};
