const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Teachers = new Schema(
    {
        name: String,
        photo: String,
        info: {
            position: String,
            degrees: String,
            subjects: String,
            about: String,
            publications: [{ title: String, published: String }],
            contacts: {
                email: String,
                mobile: String,
                telegram: String,
                whatsApp: String,
                facebook: String,
                website: String,
            },
        },
    },
    { collection: 'teachers' }
);

const toResponseTeacher = teachers => {
    const { name, photo, info: { position, degrees, subjects, about, publications, contacts: { email, mobile, telegram, whatsApp, facebook, website } } } = teachers
    return { name, photo, position, degrees, subjects, about, publications, email, mobile, telegram, whatsApp, facebook, website };
};

module.exports = {
    Teachers: mongoose.model('teachers', Teachers),
    toResponseTeacher
};