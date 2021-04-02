import { URLS } from '../constants';

export const deleteFile = async (currentObject, token, id) => {
  const file =
    currentObject[0].docs[id] &&
    currentObject[0].docs[id].url.split('/')[
      currentObject[0].docs[id].url.split('/').length - 1
    ];
  if (file) {
    await fetch(`${URLS.SERVER_URL}${URLS.DELETE}${file}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
  } else {
    return;
  }
};
