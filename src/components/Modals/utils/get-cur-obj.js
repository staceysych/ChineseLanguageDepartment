import { CONSTANTS } from '../../../constants';

export const getCurrentObj = (path, data) => {
  switch (path) {
    case CONSTANTS.TEACHERS_PAGE:
      return data.teachers && data.teachers;
    case CONSTANTS.STUDY_PAGE:
    case CONSTANTS.SCIENCE_PAGE:
      return data.materials && data.materials;
    case CONSTANTS.NEWS_PAGE:
      return data.news && data.news;
    default:
      return '';
  }
};
