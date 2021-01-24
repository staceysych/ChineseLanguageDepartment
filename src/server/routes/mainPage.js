const { Router } = require('express')
const { Pages } = require('../models/page.model')
const { toResponse } = require('../models/page.model');
const router = Router()

router.get('/', async (req, res) => {
    try {
        const page = await Pages.findOne({ page: 'main' });
        res.status(200).json(page);
    } catch (e) {
        console.log(e.message);
    }
})
router.put('/', async (req, res) => {
    try {
        const page = await Pages.findOneAndUpdate({ page: 'main' }, req.body, { new: true });
        res.status(200).json((page));
    } catch (e) {
        console.log(e.message);
    }
})



module.exports = router