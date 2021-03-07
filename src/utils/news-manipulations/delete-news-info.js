import { URLS } from '../../constants';
import { deleteManyPhotos } from './delete-many-photos';

export const deleteNewsInfo = async (currentObject, token, path, request) => {
  const files = currentObject[0].photos.map((el) => {
    return el.split('/')[el.split('/').length - 1];
  });

  await deleteManyPhotos(files, token).then(() => {
    request(
      `${URLS.SERVER_URL}${path}/${currentObject[0]._id}`,
      'DELETE',
      {},
      token
    );
  });
};
