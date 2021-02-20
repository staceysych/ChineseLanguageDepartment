import { URLS } from '../constants';

export const uploadPhoto = async (fileForUpload, token) => {
  const img = new FormData();

  img.append('image', fileForUpload, fileForUpload.name);
  const res = await fetch(`${URLS.SERVER_URL}${URLS.UPLOAD}`, {
    method: 'POST',
    body: img,
    headers: { Authorization: `Bearer ${token}` }
  });

  const imgLocation = await res.json();
  return imgLocation;
}
