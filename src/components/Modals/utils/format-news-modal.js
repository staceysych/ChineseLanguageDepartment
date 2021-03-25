import moment from 'moment';
import 'moment/locale/ru';

export const formatNewsForModal = ({
  _id,
  title,
  description,
  article,
  date,
  coverPhoto,
  photos,
}) => ({
  _id,
  title,
  description,
  article,
  date: date && moment(date * 1000),
  coverPhoto,
  photos: photos.map((item) => ({
    url: item,
  })),
});
