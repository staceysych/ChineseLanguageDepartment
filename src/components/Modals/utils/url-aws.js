export const urlsForAws = (id, index, item) => {
  if (id) {
    for (let i = 0; i < id.length; i++) {
      if (id[i][1] === index) {
        return id[i][0];
      }
    }
    return item.url;
  } else {
    return item.url;
  }
};
