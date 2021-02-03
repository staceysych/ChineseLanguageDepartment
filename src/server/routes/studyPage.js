const { Router } = require('express');
const { Pages } = require('../models/page.model');
const { Materials } = require('../models/materials.model');
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

router.post('/:selector/:year', async (req, res) => {
  try {
    const material = await Materials.find({});
    material[0].materials.map((el) => {
      if (el.path === req.params.selector) {
        let array = el.docs.filter(
          (el) => el.year === parseInt(req.params.year)
        );
        array.push(req.body);
        res.status(200).json(material[0]);
      }
    });
    material[0].save();
  } catch (e) {
    console.log(e.message);
  }
});

router.delete('/:selector/:year/:id', async (req, res) => {
  try {
    const material = await Materials.find({});
    material[0].materials.map((el) => {
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

router.put('/:selector/:year/:id', async (req, res) => {
  try {
    const material = await Materials.find({});
    material[0].materials.map((el) => {
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
