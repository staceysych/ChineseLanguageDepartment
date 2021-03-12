import { URLS } from '../constants';

export const deleteFile = async (currentObject, token, id) => {
  console.log(currentObject[0].docs[id]);
  const file = currentObject[0].docs[id] ? currentObject[0].docs[id].url.split('/')[
    currentObject[0].docs[id].url.split('/').length - 1
  ] : undefined;
  if (file !== undefined){
  await fetch(`${URLS.SERVER_URL}${URLS.DELETE}${file}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
} else {
  return
}
};
