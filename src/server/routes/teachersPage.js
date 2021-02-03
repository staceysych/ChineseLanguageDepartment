const { Router } = require('express');
const { Pages } = require('../models/page.model');
const { Teachers } = require('../models/teachers.model');
const { toResponseTeacher } = require('../models/teachers.model');
const router = Router();

router.get('/', async (req, res) => {
  try {
    const page = await Pages.findOne({ page: 'teachers' });
    const teachers = await Teachers.find({});

    res.status(200).json({ teachers, page });
  } catch (e) {
    throw new Error(e.message);
  }
});

router.get('/:name', async (req, res) => {
  try {
    const teacher = await Teachers.findOne({ name: req.params.name });
    res.status(200).json(toResponseTeacher(teacher));
  } catch (e) {
    throw new Error(e.message);
  }
});

router.put('/:name', async (req, res) => {
  try {
    const teacher = await Teachers.findOneAndUpdate(
      { name: req.params.name },
      req.body,
      { new: true }
    );
    res.status(200).json(teacher);
  } catch (e) {
    console.log(e.message);
  }
});

router.post('/', async (req, res) => {
  try {
    const teacher = await Teachers.create(req.body);
    teacher.save();
    res.status(200).json(teacher);
  } catch (e) {
    console.log(e.message);
  }
});

router.delete('/:name', async (req, res) => {
  try {
    const teacher = await Teachers.findOne({ name: req.params.name });
    if (teacher) {
      teacher.delete();
      res.status(200).json('teacher deleted');
    }
    res.status(404).json('teacher not found');
  } catch (e) {
    console.log(e.message);
  }
});

router.get('/:name/publications/', async (req, res) => {
  try {
    const teacher = await Teachers.findOne({ name: req.params.name });
    res.status(200).json(teacher.publications);
  } catch (e) {
    console.log(e.message);
  }
});
router.get('/:name/publications/:id', async (req, res) => {
  try {
    const teacher = await Teachers.findOne({ name: req.params.name });
    res.status(200).json(teacher.publications[req.params.id]);
  } catch (e) {
    console.log(e.message);
  }
});

router.put('/:name/publications/:id/', async (req, res) => {
  try {
    const teacher = await Teachers.findOne({ name: req.params.name });
    teacher.publications[req.params.id] = req.body;
    teacher.save();
    res.status(200).json(teacher.publications[req.params.id]);
  } catch (e) {
    console.log(e.message);
  }
});

router.post('/:name/publications/', async (req, res) => {
  try {
    const teacher = await Teachers.findOne({ name: req.params.name });
    teacher.publications = [...teacher.publications, req.body];
    teacher.save();
    res.status(200).json(teacher.publications);
  } catch (e) {
    console.log(e.message);
  }
});

router.delete('/:name/publications/:id', async (req, res) => {
  try {
    const teacher = await Teachers.findOne({ name: req.params.name });
    teacher.publications.map((el, index) => {
      if (el.title === teacher.publications[req.params.id].title) {
        teacher.publications.splice(index, 1);
      }
    });
    teacher.save();
    res.status(200).json(teacher.publications);
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = router;
