import { urlsForAws } from './url-aws';

import {
  getTimeStamp,
} from '../../../utils';

import { CONSTANTS } from '../../../constants';

export const formatMaterialsForServer = (obj, path, id) => {
  const { NO_INFO } = CONSTANTS;
  if (path === 'study') {
    return {
      name: obj.name,
      docs: obj.docs.map((item, index) => ({
        year: item.year,
        specialization: item.specialization,
        name: item.name,
        url: urlsForAws(id, index, item),
      })),
    };
  } else {
    return {
      name: obj.name,
      docs: obj.docs.map((item) => ({
        date: `${getTimeStamp(item.date)}` || NO_INFO,
        name: item.name || NO_INFO,
        published: item.published || NO_INFO,
        url: item.url || NO_INFO,
        author: item.author || NO_INFO,
        place: item.place || NO_INFO,
      })),
    };
  }
};
