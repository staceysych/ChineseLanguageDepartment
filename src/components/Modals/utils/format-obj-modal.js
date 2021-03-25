import { CONSTANTS } from '../../../constants';

import { formatInfoForModal } from './format-for-modal';
import { formatMaterialsForModal } from './format-materials-modal';
import { formatNewsForModal } from './format-news-modal';

export const formatObjForModal = (path, obj) => {
  switch (path) {
    case CONSTANTS.TEACHERS_PAGE:
      return formatInfoForModal(obj);
    case CONSTANTS.STUDY_PAGE:
    case CONSTANTS.SCIENCE_PAGE:
      return formatMaterialsForModal(obj, path);
    case CONSTANTS.NEWS_PAGE:
      return formatNewsForModal(obj);
    default:
      return null;
  }
};
