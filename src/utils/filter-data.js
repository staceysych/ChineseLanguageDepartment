export const filterData = (allData, prop, clientProp) => {
  const [data] = allData.filter(obj => obj[prop] === clientProp);
  return data;
}
