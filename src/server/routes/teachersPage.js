const { Router } = require('express');
const { Pages } = require('../models/page.model');
const { Teachers } = require('../models/teachers.model');
const { toResponseTeacher } = require('../models/teachers.model');
const router = Router();

const config = require('config');
const jwt = require('jsonwebtoken');
const verifyToken = require('../utils/verifyToken');

router.get('/', async (req, res) => {
  try {
    const page = await Pages.findOne({ page: 'teachers' });
    const teachers = await Teachers.find({});
    res.status(200).json({ teachers, page });
  } catch (e) {
    res.status(500).json({
      message: 'Произошла ошибка, попробуйте перезагрузить страницу',
      e: e.message,
    });
  }
});

router.get('/:name', async (req, res) => {
  try {
    const teacher = await Teachers.findOne({ name: req.params.name });
    res.status(200).json(toResponseTeacher(teacher));
  } catch (e) {
    res.status(500).json({
      message: 'Произошла ошибка, попробуйте перезагрузить страницу',
      e: e.message,
    });
  }
});

router.put('/:id', verifyToken, (req, res) => {
  jwt.verify(req.token, config.get('jwtSecret'), async (err) => {
    if (err) {
      console.log(req.token);
      res.status(403).json({ message: 'Forbidden' });
    } else {
      try {
        const teacher = await Teachers.findOneAndUpdate(
          { _id: req.params.id },
          req.body,
          { new: true }
        );
        res.status(200).json({ message: 'Данные учителя изменены!' });
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
      res.status(403).json({ message: 'Forbidden' });
    } else {
      try {
        const teacher = await Teachers.create(req.body);
        teacher.save();
        res.status(200).json({ message: 'Учитель добавлен!' });
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
  console.log(req.params);
  jwt.verify(req.token, config.get('jwtSecret'), async (err) => {
    if (err) {
      console.log(req.token);
      res.status(403).json({ message: 'Forbidden' });
    } else {
      try {
        const teacher = await Teachers.findOne({ _id: req.params.id });
        teacher.delete();
        res.status(200).json({ message: 'Данные учителя были удалены!' });
      } catch (e) {
        res.status(500).json({
          message: 'Произошла ошибка, попробуйте перезагрузить страницу',
          e: e.message,
        });
      }
    }
  });
});

<<<<<<< HEAD
=======
// My function
router.delete('/:id', verifyToken, (req, res) => {
  jwt.verify(req.token, config.get('jwtSecret'), async (err) => {
    if (err) {
      console.log(req.token);
      res.status(403).json({ message: 'Forbidden' });
    } else {
      try {
        const teacher = await Teachers.findOne(
          { _id: req.params.id },
          req.body,
          {}
        );
        teacher.delete();
        res.status(200).json({ message: 'Данные учителя были удалены!' });
      } catch (e) {
        res.status(500).json({
          message: 'Произошла ошибка, попробуйте перезагрузить страницу',
          e: e.message,
        });
      }
    }
  });
});

router.get('/:name/publications/', async (req, res) => {
  try {
    const teacher = await Teachers.findOne({ name: req.params.name });
    res.status(200).json(teacher.publications);
  } catch (e) {
    res.status(500).json({
      message: 'Произошла ошибка, попробуйте перезагрузить страницу',
      e: e.message,
    });
  }
});

router.get('/:name/publications/:id', async (req, res) => {
  try {
    const teacher = await Teachers.findOne({ name: req.params.name });
    res.status(200).json(teacher.publications[req.params.id]);
  } catch (e) {
    res.status(500).json({
      message: 'Произошла ошибка, попробуйте перезагрузить страницу',
      e: e.message,
    });
  }
});

router.put('/:name/publications/:id/', verifyToken, (req, res) => {
  jwt.verify(req.token, config.get('jwtSecret'), async (err) => {
    if (err) {
      console.log(req.token);
      res.status(403).json({ message: 'Forbidden' });
    } else {
      try {
        const teacher = await Teachers.findOne({ name: req.params.name });
        teacher.publications[req.params.id] = req.body;
        teacher.save();
        res.status(200).json({
          message: `Данные публикаций ${req.params.name} были изменены!`,
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

router.post('/:name/publications/', verifyToken, (req, res) => {
  jwt.verify(req.token, config.get('jwtSecret'), async (err) => {
    if (err) {
      console.log(req.token);
      res.status(403).json({ message: 'Forbidden' });
    } else {
      try {
        const teacher = await Teachers.findOne({ name: req.params.name });
        teacher.publications = [...teacher.publications, req.body];
        teacher.save();
        res.status(200).json({
          message: `Данные публикаций ${req.params.name} были добавлены!`,
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

router.delete('/:name/publications/:id', verifyToken, (req, res) => {
  jwt.verify(req.token, config.get('jwtSecret'), async (err) => {
    if (err) {
      console.log(req.token);
      res.status(403).json({ message: 'Forbidden' });
    } else {
      try {
        const teacher = await Teachers.findOne({ name: req.params.name });
        teacher.publications.map((el, index) => {
          if (el.title === teacher.publications[req.params.id].title) {
            teacher.publications.splice(index, 1);
          }
        });
        teacher.save();
        res.status(200).json({
          message: `Данные публикаций ${req.params.name} были удалены!`,
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

>>>>>>> develop
module.exports = router;
