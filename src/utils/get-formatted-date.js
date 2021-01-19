export const getFormattedDate = (timestamp, path) => {
  if (timestamp) {
    const localDate = new Date(timestamp * 1000).toLocaleString('en-US');

    const date = new Date(localDate);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    month = month > 9 ? month : `0${month}`;
    let day = date.getDate();
    day = day > 9 ? day : `0${day}`;

    if (path === 'publication' || path === 'collection') {
      return `${year}`;
    }

    return `${day}-${month}-${year}`;
  }

  return '';
};
