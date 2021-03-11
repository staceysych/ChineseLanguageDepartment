import { URLS } from '../../constants';

export const multiplePhotoUploadHandler = async (
  filesForUpload,
  token,
  path
) => {
  const data = new FormData();

  if (path === 'study') {
    filesForUpload.forEach((el) => {
      console.log(el[0]);
      data.append('file', el[0], el[0].name);
    });
  } else {
    filesForUpload.forEach((el) => {
      data.append('images', el, el.name);
    });
  }
  const url =
    path === 'study'
      ? `${URLS.SERVER_URL}${URLS.UPLOAD_FILE}`
      : `${URLS.SERVER_URL}${URLS.MULTIPLE_UPLOAD_FILE}`;

  const res = await fetch(url, {
    method: 'POST',
    body: data,
    headers: { Authorization: `Bearer ${token}` },
  });

  const imgLocation = await res.json();
  return imgLocation;
};
