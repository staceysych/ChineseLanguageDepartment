import {
  convertArrayToObject,
} from '../../../utils';

export const formatTeachersInfoForServer = ({
  name,
  position,
  degree,
  subjects,
  about,
  publications,
  contacts,
}) => ({
  name,
  position,
  degree,
  subjects,
  about,
  publications,
  contacts: convertArrayToObject(contacts),
});
