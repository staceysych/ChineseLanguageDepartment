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
/* Hardzei, A. Plagiarism Problem Solving based on Combinatory Semantics / A. Hardzei = Гордей, А.Н. Проблема плагиата сквозь призму комбинаторной семантики / А.Н. Гордей (на англ. яз.) */
/* 
"publications": [{
    "title": "Hardzei, A. Plagiarism Problem Solving based on Combinatory Semantics / A. Hardzei = Гордей, А.Н. Проблема плагиата сквозь призму комбинаторной семантики / А.Н. Гордей (на англ. яз.)",
    "published": "Communications in Computer and Information Science (CCIS). ‒ Switzerland: Springer Nature Switzerland AG, 2020. – Vol. 1282. – P. 176–197."
}, {
    "title": "Гордей, А.Н. Теория автоматического порождения архитектуры знаний: ТАПАЗ-2 = Theory for Automatic Generation of Knowledge Architecture: TAPAZ-2 / А. Н. Гордей; пер. с рус. И. М. Бойко. – Rev. English edn. – Минск : РИВШ, 2017. – 50 с. (на англ. яз.)",
    "published": "Республиканский институт высшей школы, 2017"
}, {
    "title": "Гордей, А.Н. Принципы исчисления семантики предметных областей / А.Н. Гордей. Автореф. дисс... доктора филол. наук. Москва, 1998. – 30 с.",
    "published": "Издательский центр Белгосуниверситета, 1998"
}, {
    "title": "Гордей, А.Н. Теория автоматического порождения архитектуры знаний (ТАПАЗ-2) и дальнейшая минимизация семантических исчислений / А.Н. Гордей",
    "published": "Открытые семантические технологии проектирования интеллектуальных систем = Open Semantic Technologies for Intelligent Systems (OSTIS-2014): материалы IV Междунар. науч.-техн. конф., Минск, 20-22 февраля 2014 г. / редкол.: В.В. Голенков (отв. ред.) [и др.]. ‒ Минск: БГУИР, 2014. ‒ С. 49-64."
}, {
    "title": "Гордей, А.Н. Семантическое пространство в факториале теории автоматического порождения архитектуры знаний: ТАПАЗ-2 [Электронный ресурс] / А.Н. Гордей",
    "published": "Информационные системы и технологии: материалы Междунар. конгресса по информатике (CSIST 2016) (г. Минск, 24–27 окт. 2016 г.) / Белорус. гос. ун-т. – Минск, 2016. – С. 543–547."
}], */
