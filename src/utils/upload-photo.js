import { URLS } from '../constants';

export const uploadPhoto = async (fileForUpload) => {
  const img = new FormData();

  img.append('image', fileForUpload, fileForUpload.name);
  const res = await fetch(`${URLS.SERVER_URL}${URLS.UPLOAD}`, {
    method: 'POST',
    body: img,
  });

  const imgLocation = await res.json();
  return imgLocation;
}
