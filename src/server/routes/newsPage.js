const { Router } = require('express');
const { Pages } = require('../models/page.model');
const { News } = require('../models/news.model');
const router = Router();

router.get('/', async (req, res) => {
  try {
    const page = await Pages.findOne({ page: 'news' });
    const news = await News.find({});
    res.status(200).json({ news, page });
  } catch (e) {
    res.status(400).json('Bad request')
  }
});
router.put('/', async (req, res) => {
  try {
    const page = await Pages.findOneAndUpdate({ page: 'news' }, req.body, {
      new: true,
    });
    console.log(req.body);
    res.status(200).json(page);
  } catch (e) {
    res.status(400).json('Bad request')
  }
});

router.post('/', async (req, res) => {
  try {
    const news = await News.create(req.body);
    news.save();
    res.status(200).json(news);
  } catch (e) {
    res.status(400).json('Bad request')
  }
});

router.put('/:id', async (req, res) => {
    try {
      const news = await News.findOneAndUpdate({_id: req.params.id}, req.body, {new: true});
      news.save();
      res.status(200).json(news);
    } catch (e) {
      res.status(404).json('Not Found')
    }
  });
  router.delete('/:id', async (req, res) => {
    try {
      const news = await News.findOneAndDelete({_id: req.params.id});
      news.save();
      res.status(200).json('deleted');
    } catch (e) {
      console.log('2');
      res.status(404).json('Not Found')
    }
  });

module.exports = router;
