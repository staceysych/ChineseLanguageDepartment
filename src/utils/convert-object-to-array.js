export const convertObjectToArray = (obj) => {
  return Object.entries(obj).map((item) => ({
    title: item[0],
    contact: item[1],
  }))
}
