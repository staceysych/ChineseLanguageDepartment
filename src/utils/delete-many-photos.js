import { URLS } from '../constants';

export const deleteManyPhotos = async (filesForDelete, token) => {

    filesForDelete.forEach( async (el) => {
        await fetch(`${URLS.SERVER_URL}${URLS.DELETE}${el}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` }
          });
    })
};
