const express = require('express')
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json({ extended: true }))

app.use('/teachers', require('./routes/mainPage.js'))

module.exports = app
