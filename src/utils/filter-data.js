export const filterData = (allData, page) => {
  const [data] = allData.filter(obj => obj.page === page);
  return data;
}
