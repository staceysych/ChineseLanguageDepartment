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

router.post('/:selector', async (req, res) => {
  try {
    const material = await ScienceMaterials.find({});
    material[0].scienceMaterials.map((el) => {
      if (el.path === req.params.selector) {
        el.docs.push(req.body);
        res.status(200).json(material[0]);
      }
    });
    material[0].save();
  } catch (e) {
    console.log(e.message);
  }
});

router.delete('/:selector/:id', async (req, res) => {
  try {
    const material = await ScienceMaterials.find({});
    material[0].scienceMaterials.map((el) => {
      if (el.path === req.params.selector) {
        el.docs.map((element, id) => {
          if (element.id === req.params.id) {
            el.docs.splice(id, 1);
          }
        });
      }
    });
    material[0].save();
    res.status(200).json(material[0]);
  } catch (e) {
    console.log(e.message);
  }
});

router.put('/:selector/:id', async (req, res) => {
  try {
    const material = await ScienceMaterials.find({});
    material[0].scienceMaterials.map((el) => {
      if (el.path === req.params.selector) {
        el.docs.map((element, id) => {
          if (element.id === req.params.id) {
            el.docs[id] = { ...req.body, _id: req.params.id };
            material[0].save();
          }
        });
      }
    });
    res.status(200).json(material[0]);
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = router;
