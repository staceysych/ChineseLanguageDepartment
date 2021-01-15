const { Router } = require('express')
const { Pages } = require('../models/page.model');
const { Teachers } = require('../models/teachers.model');
const { toResponseTeacher } = require('../models/teachers.model');
const { toResponse } = require('../models/page.model');
const router = Router()

router.get('/', async (req, res) => {
    try {
        const page = await Pages.findOne({ page: 'teachers' });
        const teachers = await Teachers.find({})
        const obj = {
            teachers: teachers.map(toResponseTeacher),
            page: toResponse(page)
        }
        res.status(200).json(obj);
    } catch (e) {
        throw new Error(e.message)
    }
})



module.exports = router