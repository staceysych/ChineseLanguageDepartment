import moment from 'moment';
import 'moment/locale/ru';

export const formatMaterialsForModal = ({ _id, name, docs }, path) => {
  if (path === 'study') {
    return {
      _id,
      name,
      docs: docs
        .sort((a, b) => a.year - b.year)
        .map((obj) => ({
          year: obj.year,
          name: obj.name,
          specialization: obj.specialization,
          url: obj.url,
        })),
    };
  } else {
    return {
      _id,
      name,
      docs: docs.map((obj) => ({
        date: obj.date && moment(obj.date * 1000),
        name: obj.name,
        published: obj.published,
        url: obj.url,
        author: obj.author,
        place: obj.place,
      })),
    };
  }
};
