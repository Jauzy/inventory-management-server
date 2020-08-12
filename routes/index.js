const route = require('express').Router()
const admin = require('./admin')
const organization = require('./organization')
const item = require('./item')
const history = require('./history')

route.use('/history', history)
route.use('/admin', admin)
route.use('/organization', organization)
route.use('/item', item)

module.exports = route