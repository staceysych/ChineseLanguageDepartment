export const generateCurrentNews = (newsObj, currentNewsPage, newsPerPage) => {
  const newsArr = newsObj.news;
  if (newsArr) {
    const indexOfLastElement = currentNewsPage * newsPerPage;
    const indexOfFirstElement = indexOfLastElement - newsPerPage;
    return newsArr.slice(indexOfFirstElement, indexOfLastElement);
  }
};
