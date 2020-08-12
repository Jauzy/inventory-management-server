require('dotenv').config()

const express = require("express")
const app = express()
const PORT = process.env.PORT || 8001

//mongoose
const mongoose = require('mongoose')

//db URL
const mongodbUri = process.env.MONGOURI

//setting up DB params (mongodbUri, optional) (wajib)
// useNewURLParser buat ignore warning (wajib)
mongoose
    .connect(mongodbUri, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDb connected on', mongodbUri)
    })
    .catch(err => {
        console.log(err)
    })

//cors
app.use(require('cors')())

//body-parser express
app.use(express.json({ limit: '2048mb' }))
app.use(express.urlencoded({ extended: true }))

//routers in index.js
const router = require('./routes/index')
app.use('/', router)

app.listen(PORT, (err) => {
    if(err) console.log(err)
    console.log(`Server running on port ${PORT}`)
})