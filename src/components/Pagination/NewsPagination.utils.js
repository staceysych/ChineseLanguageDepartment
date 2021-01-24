export const generateCurrentNews = (newsObj, currentNewsPage, newsPerPage) => {

  const newsArr = newsObj.news;
  if (newsArr) {
    const indexOfLastElement = currentNewsPage * newsPerPage;
    const indexOfFirstElement = indexOfLastElement - newsPerPage;
    newsArr.sort(sortNewsByDate);
    const currentNews = newsArr.slice(indexOfFirstElement, indexOfLastElement);
    return currentNews;
  }
};

const sortNewsByDate = (a, b) => {
  const objADate = +a.date;
  const objBDate = +b.date;

  let comparison = 0;

  if(objADate > objBDate) {
    comparison = -1;
  } else if (objADate < objBDate) {
    comparison = 1;
  }

  return comparison;
}
