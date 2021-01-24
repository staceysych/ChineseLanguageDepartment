const { Router } = require('express')
const { Pages } = require('../models/page.model.second')
const { Materials } = require('../models/materials.model')

const { toResponse } = require('../models/page.model.second');

const { toResponseMaterials } = require('../models/materials.model');
const router = Router()

router.get('/', async (req, res) => {
    try {
        const page = await Pages.findOne({ page: 'study' });
        const material = await Materials.find();
        const result = {
            materials: material,
            page: toResponse(page)
        }
        res.status(200).json(result);
    } catch (e) {
        console.log(e.message);
    }
})
router.post('/', async (req, res) => {
    try {
        const materials = new Materials(req.body);
        await materials.save()
        console.log(materials);
        res.status(200).json(toResponseMaterials(materials));
    } catch (e) {
        console.log(e.message);
    }
})


module.exports = router