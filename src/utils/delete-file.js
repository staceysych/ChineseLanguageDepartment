import { URLS } from '../constants';

export const deleteFile = async (currentObject, token) => {
  const photo = currentObject[0].photo.split('/')[
    currentObject[0].photo.split('/').length - 1
  ];

  await fetch(`${URLS.SERVER_URL}${URLS.DELETE}/file/${photo}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
};
