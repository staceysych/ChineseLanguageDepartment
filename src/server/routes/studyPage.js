const { Router } = require('express');
const { Pages } = require('../models/page.model');
const { Materials } = require('../models/materials.model');

const { toResponseMaterials } = require('../models/materials.model');
const router = Router();

router.get('/', async (req, res) => {
  try {
    const page = await Pages.findOne({ page: 'study' });
    const material = await Materials.find();
    const result = {
      materials: material,
      page: page,
    };
    res.status(200).json(result);
  } catch (e) {
    console.log(e.message);
  }
});
router.post('/:selector', async (req, res) => {
  try {
/*     const materials = new Materials(req.body);
    materials.save(); */
    const material = await Materials.find({});
    const a = material[0].materials.filter((el) => { el.path === 'exam'});
    console.log(material[0].materials);
    res.status(200).json(material[0].materials);
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = router;
