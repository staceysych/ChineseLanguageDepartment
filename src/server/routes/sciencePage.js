const { Router } = require('express');
const { Pages } = require('../models/page.model');
const { ScienceMaterials } = require('../models/scienceMaterial.model');
const router = Router();

const config = require('config');
const jwt = require('jsonwebtoken');
const verifyToken = require('../utils/verifyToken');

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
    res.status(500).json({
      message: 'Произошла ошибка, попробуйте перезагрузить страницу',
      e: e.message,
    });
  }
});

router.post('/:selector', verifyToken, (req, res) => {
  jwt.verify(req.token, config.get('jwtSecret'), async (err) => {
    if (err) {
      console.log(req.token);
      res.status(403).json({ message: 'Forbidden' });
    } else {
      try {
        const material = await ScienceMaterials.find({});
        material[0].scienceMaterials.map((el) => {
          if (el.path === req.params.selector) {
            el.docs.push(req.body);
            res.status(200).json({ message: 'Материал добавлен!' });
          }
        });
        material[0].save();
      } catch (e) {
        res.status(500).json({
          message: 'Произошла ошибка, попробуйте перезагрузить страницу',
          e: e.message,
        });
      }
    }
  });
});

router.delete('/:selector/:id', verifyToken, (req, res) => {
  jwt.verify(req.token, config.get('jwtSecret'), async (err) => {
    if (err) {
      console.log(req.token);
      res.status(403).json({ message: 'Forbidden' });
    } else {
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
        res.status(200).json({ message: 'Материал удален' });
      } catch (e) {
        res.status(500).json({
          message: 'Произошла ошибка, попробуйте перезагрузить страницу',
          e: e.message,
        });
      }
    }
  });
});

router.put('/:selector/:id', verifyToken, (req, res) => {
  jwt.verify(req.token, config.get('jwtSecret'), async (err) => {
    if (err) {
      console.log(req.token);
      res.status(403).json({ message: 'Forbidden' });
    } else {
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
        res.status(200).json({ message: 'Материал изменен' });
      } catch (e) {
        res.status(500).json({
          message: 'Произошла ошибка, попробуйте перезагрузить страницу',
          e: e.message,
        });
      }
    }
  });
});

module.exports = router;
