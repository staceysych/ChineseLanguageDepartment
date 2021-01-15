const express = require('express')
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json({ extended: true }))

app.use('/about', require('./routes/aboutPage.js'))
app.use('/teachers', require('./routes/teachersPage.js'))
app.use('/', require('./routes/mainPage.js'))


module.exports = app
