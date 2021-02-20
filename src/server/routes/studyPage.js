const { Router } = require('express');
const { Pages } = require('../models/page.model');
const { Materials } = require('../models/materials.model');
const router = Router();

const config = require('config');
const jwt = require('jsonwebtoken');
const verifyToken = require('../utils/verifyToken');

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
    res.status(500).json({
      message: 'Произошла ошибка, попробуйте перезагрузить страницу',
      e: e.message,
    });
  }
});

router.post('/:selector/:year', verifyToken, (req, res) => {
  jwt.verify(req.token, config.get('jwtSecret'), async (err) => {
    if (err) {
      console.log(req.token);
      res.status(403).json({ message: 'Forbidden' });
    } else {
      try {
        const material = await Materials.find({});
        material[0].materials.map((el) => {
          if (el.path === req.params.selector) {
            let array = el.docs.filter(
              (el) => el.year === parseInt(req.params.year)
            );
            array.push(req.body);
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

router.delete('/:selector/:year/:id', verifyToken, (req, res) => {
  jwt.verify(req.token, config.get('jwtSecret'), async (err) => {
    if (err) {
      console.log(req.token);
      res.status(403).json({ message: 'Время сеанса вышло! Для продолжения войдите заново.' });
    } else {
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
        res.status(200).json({ message: 'Материал добавлен!' });
      } catch (e) {
        res.status(500).json({
          message: 'Произошла ошибка, попробуйте перезагрузить страницу',
          e: e.message,
        });
      }
    }
  });
});

router.put('/:selector/:year/:id', verifyToken, (req, res) => {
  jwt.verify(req.token, config.get('jwtSecret'), async (err) => {
    if (err) {
      console.log(req.token);
      res.status(403).json({ message: 'Forbidden' });
    } else {
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
        res.status(200).json({ message: 'Материал изменен!' });
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
