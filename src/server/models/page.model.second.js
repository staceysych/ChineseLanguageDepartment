const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PagesNew = new Schema(
  {
    page: { type: String, required: true },
    label: String,
    heading: String,
    mainDescription: String,
    featuresTitle: String,
    featuresInfo: String,
    detailsTitle: String,
    detailsInfo: String,
    adressPlace: String,
    adressRoom: String,
    mailName: String,
    email: String,
    mobile: String,
  },
  { collection: 'pages' }
);

const toResponse = pages => {
  const { mainDescription, featuresInfo, featuresTitle, page, heading, label, detailsTitle, detailsInfo, adressPlace, adressRoom, mailName, email, mobile } = pages
  return { mainDescription, featuresInfo, featuresTitle, page, heading, label, detailsTitle, detailsInfo, adressPlace, adressRoom, mailName, email, mobile };
};

module.exports = {
  Pages: mongoose.model('pages', PagesNew),
  toResponse
};

/* "page": "main",
    "label": "",
    "heading": "КАФЕДРА ТЕОРИИ И ПРАКТИКИ КИТАЙСКОГО ЯЗЫКА",
    "mainDescription": "Факультет китайского языка и культуры, Минский Государственный Лингвистический Университет",
    "featuresTitle": "",
    "featuresInfo": "",
    "detailsTitle": "",
    "detailsInfo": "",
    "adressPlace": "",
    "adressRoom": "",
    "mailName": "",
    "email": "",
    "mobile": "",
    "__v": 0 */