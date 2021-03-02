import { URLS } from '../constants';

export const uploadFile = async (fileForUpload, token) => {
  const file = new FormData();
  
  file.append('file', fileForUpload, fileForUpload.name);
  const res = await fetch(`${URLS.SERVER_URL}${URLS.UPLOAD}/file`, {
    method: 'POST',
    body: file,
    headers: { Authorization: `Bearer ${token}` }
  });

  const fileLocation = await res.json();
  return fileLocation;
}
