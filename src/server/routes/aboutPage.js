const { Router } = require('express')
const { Pages } = require('../models/page.model.second')
const { toResponse } = require('../models/page.model.second');
const router = Router()

router.get('/', async (req, res) => {
    try {
        const page = await Pages.findOne({ page: 'about' });
        res.status(200).json(toResponse(page));
    } catch (e) {
        console.log(e.message);
    }
})



module.exports = router