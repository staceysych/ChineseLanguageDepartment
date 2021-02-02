const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Materials = new Schema(
  {
    materials: [{
      name: { type: String, required: true },
      path: { type: String, required: true },
      docs: [
        {
          year: Number,
          specialization: String,
          name: String,
          urls: {
            main: String,
            example: String,
            instructions: String
          }
        }
      ]
    }]
  },
  { collection: 'materials' }
);

const toResponseMaterials = material => {
  const { materials } = material
  return { materials };
};

module.exports = {
  Materials: mongoose.model('materials', Materials),
  toResponseMaterials
};
