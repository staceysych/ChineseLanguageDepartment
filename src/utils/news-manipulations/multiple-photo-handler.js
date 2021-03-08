import { URLS } from '../../constants';
import { notification } from 'antd';

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
  if (imgLocation.message) {
    notification.open({
      message: imgLocation.message,
      duration: 1,
    });
  } else {
    return imgLocation;
  }
};
