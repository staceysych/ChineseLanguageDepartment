const { Router } = require('express');
const { Pages } = require('../models/page.model');
const { ScienceMaterials } = require('../models/scienceMaterial.model');

const { toResponseMaterials } = require('../models/scienceMaterial.model');
const router = Router();

router.get('/', async (req, res) => {
  try {
    const page = await Pages.findOne({ page: 'science' });
    const material = await ScienceMaterials.find();
    const result = {
      materials: material,
      page: page,
    };
    res.status(200).json(result);
  } catch (e) {
    console.log(e.message);
  }
});
router.post('/', async (req, res) => {
  try {
    const materials = new ScienceMaterials(req.body);
    await materials.save();
    console.log(materials);
    res.status(200).json(toResponseMaterials(materials));
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = router;
