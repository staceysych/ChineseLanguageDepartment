const { Router } = require('express');
const { Pages } = require('../models/page.model');
const { News } = require('../models/news.model');
const router = Router();

const config = require('config');
const jwt = require('jsonwebtoken');
const verifyToken = require('../utils/verifyToken');

router.get('/', async (req, res) => {
  try {
    const page = await Pages.findOne({ page: 'news' });
    const news = await News.find({});
    res.status(200).json({ news, page });
  } catch (e) {
    res.status(500).json({
      message: 'Произошла ошибка, попробуйте перезагрузить страницу',
      e: e.message,
    });
  }
});

router.put('/', verifyToken, (req, res) => {
  jwt.verify(req.token, config.get('jwtSecret'), async (err) => {
    if (err) {
      console.log(req.token);
      res
        .status(403)
        .json({
          message: 'Время сеанса вышло! Для продолжения войдите заново.',
        });
    } else {
      try {
        await Pages.findOneAndUpdate({ page: 'news' }, req.body, {
          new: true,
        });
        console.log(req.body);
        res
          .status(200)
          .json({ message: 'Изменения были внесены', reload: true });
      } catch (e) {
        res.status(500).json({
          message: 'Произошла ошибка, попробуйте перезагрузить страницу',
          e: e.message,
        });
      }
    }
  });
});

router.post('/', verifyToken, (req, res) => {
  jwt.verify(req.token, config.get('jwtSecret'), async (err) => {
    if (err) {
      console.log(req.token);
      res
        .status(403)
        .json({
          message: 'Время сеанса вышло! Для продолжения войдите заново.',
        });
    } else {
      try {
        const news = await News.create(req.body);
        news.save();
        res.status(200).json({ message: 'Новость добавлена!', reload: true });
      } catch (e) {
        res.status(500).json({
          message: 'Произошла ошибка, попробуйте перезагрузить страницу',
          e: e.message,
        });
      }
    }
  });
});

router.put('/:id', verifyToken, (req, res) => {
  jwt.verify(req.token, config.get('jwtSecret'), async (err) => {
    if (err) {
      console.log(req.token);
      res
        .status(403)
        .json({
          message: 'Время сеанса вышло! Для продолжения войдите заново.',
        });
    } else {
      try {
        await News.findOneAndUpdate({ _id: req.params.id }, req.body, {
          new: true,
        });
        res
          .status(200)
          .json({
            message: 'Данные успешно изменены! Обновите страницу.',
            reload: true,
          });
      } catch (e) {
        res.status(500).json({
          message: 'Произошла ошибка, попробуйте перезагрузить страницу',
          e: e.message,
        });
      }
    }
  });
});

router.delete('/:id', verifyToken, (req, res) => {
  jwt.verify(req.token, config.get('jwtSecret'), async (err) => {
    if (err) {
      console.log(req.token);
      res.status(403).json('Forbidden');
    } else {
      try {
        await News.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Новость удалена!', reload: true });
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
