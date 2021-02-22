import { filterData } from './filter-data';
import { getInitialState } from './get-initial-state';
import { setLocalStorage } from './set-localStorage';
import { getFormattedDate } from './get-formatted-date';
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

export {
  filterData,
  mockedData,
  getInitialState,
  setLocalStorage,
  getFormattedDate,
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
};
