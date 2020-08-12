const route = require('express').Router()
const HistoryController = require('../controllers/history')
const verifyToken = require('../middlewares/verifyToken')

route.get('/', HistoryController.getAll)
route.post('/', verifyToken, HistoryController.addNew)
route.put('/', verifyToken, HistoryController.returnItem)
route.get('/org', verifyToken, HistoryController.getOrgHistory)

route.get('/count', HistoryController.getHistoriesCount)

module.exports = route