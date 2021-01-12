const { Router } = require('express')
const { Pages } = require('./page.model')
const { toResponse } = require('./page.model');
const router = Router()

router.get('/', async (req, res) => {
    try {
        const page = await Pages.findOne({ page: 'main' });
        console.log(page);
        res.status(200).json(toResponse(page));
    } catch (e) {
        console.log(e.message);
    }
})



module.exports = router