import { getTimeStamp } from '../../../utils';

import { CONSTANTS } from '../../../constants';

export const formatNewsForServer = ({
  title,
  description,
  article,
  coverPhoto,
  photos,
  date,
}) => {
  const { NO_INFO } = CONSTANTS;
  return {
    title,
    description,
    article,
    date: `${getTimeStamp(date)}`,
    coverPhoto: coverPhoto || NO_INFO,
    photos: (photos && photos.map((item) => item.url)) || [],
  };
};
