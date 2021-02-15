const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Teachers = new Schema(
  {
    name: String,
    photo: String,
    position: String,
    degree: String,
    subjects: String,
    about: String,
    publications: [{ title: String, published: String, url: String }],
    contacts: { email: String, mobile: String, website: String},
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
    degree,
    subjects,
    about,
    publications,
    contacts,
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
    degree,
    subjects,
    about,
    publications,
    contacts,
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
