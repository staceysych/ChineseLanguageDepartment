const { Router } = require('express')
const { Pages } = require('../models/page.model')
const { toResponse } = require('../models/page.model');
const router = Router()

router.get('/', async (req, res) => {
    try {
        const page = await Pages.findOne({ page: 'about' });
        console.log(page);
        res.status(200).json(toResponse(page));
    } catch (e) {
        console.log(e.message);
    }
})



module.exports = router