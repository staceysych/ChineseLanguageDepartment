import { validateEmail, validateMobile, validateWebsite } from '../../../utils';

export const generateValidator = (value, name) => {
  switch (name) {
    case 0:
      return validateEmail(value);
    case 1:
      return validateMobile(value);
    case 2:
      return validateWebsite(value);
    default:
      return value;
  }
};
