import { filterData } from './filter-data';
import { getInitialState } from './get-initial-state';
import { setLocalStorage } from './set-localStorage';
import { getFormattedDate } from './get-formatted-date';
import { getTimeStamp } from './convert-into-timestamp';
import { useMessage } from './error-popup';
import { useHttp } from './request';
import mockedData from './mockedData';
import { EllipseText } from './ellipse-text';
import { Line } from './line';
import { convertArrayToObject } from './convert-array-to-object';
import { convertObjectToArray } from './convert-object-to-array';
import { validateEmail } from './validate-email';
import { validateMobile } from './validate-mobile';
import { validateWebsite } from './validate-website';
import { addNewPhoto } from './add-new-photo';
import { updatePhoto } from './update-photo';
import { deletePhoto } from './delete-photo';
import { generateRandomId } from './generate-random-id';
import { updateFile } from './update-file';
import { deleteFile } from './delete-file';
import { deleteManyPhotos } from './news-manipulations/delete-many-photos';
import { deleteNewsInfo } from './news-manipulations/delete-news-info';
import { multiplePhotoUploadHandler } from './news-manipulations/multiple-photo-handler';
import { updateNews } from './news-manipulations/update-news';
import { addNewNews } from './news-manipulations/add-new-news';
import { updateTeacherInfo } from './teachers-manipulation/update-teacher-info';
import { deleteTeacherInfo } from './teachers-manipulation/delete-teacher-info';
import { addNewTeacher } from './teachers-manipulation/add-new-teacher';

export {
  filterData,
  mockedData,
  getInitialState,
  setLocalStorage,
  getFormattedDate,
  getTimeStamp,
  useMessage,
  useHttp,
  EllipseText,
  Line,
  convertArrayToObject,
  convertObjectToArray,
  validateEmail,
  validateMobile,
  validateWebsite,
  addNewPhoto,
  updatePhoto,
  deletePhoto,
  generateRandomId,
  updateFile,
  deleteFile,
  deleteManyPhotos,
  deleteNewsInfo,
  multiplePhotoUploadHandler,
  updateNews,
  updateTeacherInfo,
  deleteTeacherInfo,
  addNewTeacher,
  addNewNews
};
