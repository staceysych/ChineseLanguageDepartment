const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Teachers = new Schema(
  {
    name: String,
    photo: String,
    position: String,
    degrees: String,
    subjects: String,
    about: String,
    publications: [{ title: String, published: String }],
    email: String,
    mobile: String,
    telegram: String,
    whatsApp: String,
    facebook: String,
    website: String,
  },
  { collection: 'teachers' }
);

const toResponseTeacher = (teachers) => {
  const {
    name,
    photo,
    position,
    degrees,
    subjects,
    about,
    publications,
    email,
    mobile,
    telegram,
    whatsApp,
    facebook,
    website,
  } = teachers;
  return {
    name,
    photo,
    position,
    degrees,
    subjects,
    about,
    publications,
    email,
    mobile,
    telegram,
    whatsApp,
    facebook,
    website,
  };
};

module.exports = {
  Teachers: mongoose.model('teachers', Teachers),
  toResponseTeacher,
};
