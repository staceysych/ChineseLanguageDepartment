import { URLS } from '../../constants';

export const multiplePhotoUploadHandler = async (filesForUpload, token) => {
  const data = new FormData();

  filesForUpload.forEach((el) => {
    data.append('images', el, el.name);
  });

  const res = await fetch(`${URLS.SERVER_URL}file/multiple-file-upload`, {
    method: 'POST',
    body: data,
    headers: { Authorization: `Bearer ${token}` },
  });

  const imgLocation = await res.json();
  return imgLocation;
};
