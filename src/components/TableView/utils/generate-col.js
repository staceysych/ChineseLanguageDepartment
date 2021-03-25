import { CONSTANTS } from '../../../constants';

import {
  createColumnsTeachers,
  createColumnsStudyMaterials,
  createColumnsScienceMaterials,
  createColumnsNews,
} from '../utils';

export const generateColumns = (path, openModal) => {
  switch (path) {
    case CONSTANTS.TEACHERS_PAGE:
      return createColumnsTeachers(openModal);
    case CONSTANTS.STUDY_PAGE:
      return createColumnsStudyMaterials(openModal);
    case CONSTANTS.SCIENCE_PAGE:
      return createColumnsScienceMaterials(openModal);
    case CONSTANTS.NEWS_PAGE:
      return createColumnsNews(openModal);
    default:
      return '';
  }
};
