import { CONSTANTS } from '../../../constants';

export const generateDataSource = (path, data) => {
  switch (path) {
    case CONSTANTS.TEACHERS_PAGE:
      return data.teachers;
    case CONSTANTS.SCIENCE_PAGE:
    case CONSTANTS.STUDY_PAGE:
      return data.materials;
    case CONSTANTS.NEWS_PAGE:
      return data.news;
    default:
      return '';
  }
};
