const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Pages = new Schema(
  {
    page: { type: String, required: true },
    label: String,
    heading: String,
    description: {
      main: String,
      features: {
        featuresTitle: String,
        featuresInfo: String,
      },
    },
    details: {
      title: String,
      info: String,
      contacts: {
        address: {
          place: String,
          room: String,
        },
        mail: {
          name: String,
          email: String,
        },
        mobile: String,
      },
    },
  },
  { collection: 'pages' }
);

const toResponse = pages => {
  const { description: { features: { featuresInfo, featuresTitle }, main }, page, heading, label, details: { title, info, contacts: { mobile, address: { place, room }, mail: { email, name } } }
  } = pages
  return { main, title, info, page, heading, label, mobile, place, room, email, name, featuresInfo, featuresTitle };
};

module.exports = {
  Pages: mongoose.model('pages', Pages),
  toResponse
};
