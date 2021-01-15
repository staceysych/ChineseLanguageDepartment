export const getInitialState = () => {
  const {
    path
  } = localStorage.settings ? JSON.parse(localStorage.settings) : {};

  return {
    path: path || location.href,
  };
};
