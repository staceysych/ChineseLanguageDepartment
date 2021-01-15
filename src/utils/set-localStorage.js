export const setLocalStorage = (arr) => {
  const [property, value] = arr[1];
  const storage = localStorage.settings ? JSON.parse(localStorage.settings) : {};
  storage[property] = value;
  localStorage.settings = JSON.stringify(storage);
}
