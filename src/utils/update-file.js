
import { URLS } from '../constants';

export const updateFile = async (
  multiplePhotoUploadHandler,
  filesForUpload,
  obj,
  path,
  token,
  request,
  paths,
  formatMaterialsForServer
) => {
  if (filesForUpload.length) {
    multiplePhotoUploadHandler(filesForUpload, token, path).then((res) => {
      const arr = res.map((el, id) => [el, filesForUpload[id][1]]);
      const formattedObj = formatMaterialsForServer(obj, path, res, arr);
      request(
        `${URLS.SERVER_URL}${path}/${paths}`,
        'PUT',
        { ...formattedObj, path: paths },
        token
      );
    });
  }
};
